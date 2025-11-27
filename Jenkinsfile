// Declarative Jenkinsfile pipeline for full project CI (backend + frontend + docker + smoke tests)
pipeline {
  agent any

  environment {
    // image tags (change to your registry if you want to push)
    BACKEND_IMAGE = "nosql-backend:${env.BUILD_NUMBER}"
    FRONTEND_IMAGE = "nosql-frontend:${env.BUILD_NUMBER}"
    DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    // Optional Jenkins secret credential id. Leave empty to run without injection.
    JWT_CREDENTIALS_ID = ''
    JWT_EXPIRATION = '86400000'
  }

  options {
    // keep the log history for troubleshooting
    timestamps()
    // faster failure detection — note: `ansiColor` as an options entry isn't valid on all Jenkins versions.
    // If you want colored logs enable the AnsiColor plugin on the controller and use `ansiColor` as a wrapper
    // in the steps (example: ansiColor('xterm') { sh '...' }) or configure the job wrappers in your Jenkins GUI.
  }

  stages {
    // helper: run command using sh on unix, bat on windows
    // NOTE: use inside(script) blocks below to access this helper because declarative 'steps' blocks run on different contexts
    
    stage('Checkout') {
      steps {
        echo 'Checkout source code'
        checkout scm
      }
    }

    stage('Prepare services') {
      steps {
        echo "Create docker network and start a temporary mongo for tests"
        script {
          if (isUnix()) {
            sh 'docker network create jenkins-net || true'
            sh "docker run -d --name jenkins-mongo --network jenkins-net -e MONGO_INITDB_DATABASE=university_auth mongo:6.0"
          } else {
            // Windows agent: use cmd/bat. '|| echo ok' avoids failing when the network already exists.
            bat 'docker network create jenkins-net || echo jenkins-net exists'
            bat 'docker run -d --name jenkins-mongo --network jenkins-net -e MONGO_INITDB_DATABASE=university_auth mongo:6.0'
          }
        }
      }
    }

    stage('Backend: build & unit tests') {
      steps {
        echo 'Using official maven+java21 container to build and run tests'
        script {
          // Use the maven docker image and attach it to the same docker network so tests can access mongo
          if (isUnix()) {
            // if a credential id is configured, inject it as JWT_SECRET into the build
            if (env.JWT_CREDENTIALS_ID?.trim()) {
              withCredentials([string(credentialsId: env.JWT_CREDENTIALS_ID, variable: 'JWT_SECRET')]) {
                def mvnImage = docker.image('maven:3.9.6-eclipse-temurin-21')
                mvnImage.pull()
                mvnImage.inside("--network jenkins-net -e MAVEN_OPTS='-Xmx1g' -e JWT_SECRET='${env.JWT_SECRET}' -e JWT_EXPIRATION='${env.JWT_EXPIRATION}'") {
                  sh 'cd backend-app && mvn -B -Djwt.secret="${JWT_SECRET}" -Djwt.expiration="${JWT_EXPIRATION}" -DskipTests=false clean test package'
                }
              }
            } else {
              def mvnImage = docker.image('maven:3.9.6-eclipse-temurin-21')
              mvnImage.pull()
              mvnImage.inside("--network jenkins-net -e MAVEN_OPTS='-Xmx1g'") {
                // If some tests are slow or require DB, keep them; adjust flags if you want to skip slow integration tests.
                // make sure we run inside the backend-app module where the pom.xml lives
                sh 'cd backend-app && mvn -B -DskipTests=false clean test package'
              }
            }
          } else {
            // Windows agents
            if (env.JWT_CREDENTIALS_ID?.trim()) {
              withCredentials([string(credentialsId: env.JWT_CREDENTIALS_ID, variable: 'JWT_SECRET')]) {
                bat "cd backend-app && mvn -B -Djwt.secret=%JWT_SECRET% -Djwt.expiration=${env.JWT_EXPIRATION} -DskipTests=false clean test package"
              }
            } else {
              // On Windows agents we attempt to run mvn from the node (ensure maven is installed there)
              bat 'cd backend-app && mvn -B -DskipTests=false clean test package'
            }
          }
        }
      }
    }

    stage('Frontend: install, test & build') {
      steps {
        echo 'Install node deps, run frontend tests and build static bundle'
        script {
          if (isUnix()) {
            def nodeImage = docker.image('node:18-alpine')
            nodeImage.pull()
            nodeImage.inside('--network jenkins-net') {
              sh 'cd frontend-app && npm ci'
              // Run frontend tests if you have any (fail pipeline if tests fail)
              sh 'cd frontend-app && npm test'
              // Build production bundle
              sh 'cd frontend-app && npm run build'
            }
          } else {
            // On Windows agent: try running npm locally (requires node installed). Use powershell if needed.
            bat 'cd frontend-app && npm ci'
            bat 'cd frontend-app && npm test'
            bat 'cd frontend-app && npm run build'
          }
        }
      }
    }

    stage('Build Docker images (local)') {
      steps {
        echo 'Build backend and frontend docker images (tagged with build number)'
        script {
          if (isUnix()) {
            sh 'docker build -t ${BACKEND_IMAGE} ./backend-app'
            sh 'docker build -t ${FRONTEND_IMAGE} ./frontend-app'
          } else {
            bat 'docker build -t %BACKEND_IMAGE% ./backend-app'
            bat 'docker build -t %FRONTEND_IMAGE% ./frontend-app'
          }
        }
      }
    }

    stage('Integration: compose up & smoke tests') {
      steps {
        echo 'Start stack with docker-compose and run a few smoke checks (health endpoints)'
        // Allow failures to be visible as pipeline fails if a smoke-test fails
        script {
          if (isUnix()) {
            sh "docker compose -f ${DOCKER_COMPOSE_FILE} up -d --build"
            // wait for services to come up (adjust timeout as needed)
            sh 'sleep 8'
            // 1) Check backend health (if your app exposes a health endpoint)
            sh 'curl -sSf http://localhost:8082/api || (echo "Backend not available" && exit 1)'
            // 2) Check frontend (served by nginx at 3000)
            sh 'curl -sSf http://localhost:3000 || (echo "Frontend not available" && exit 1)'
          } else {
            bat "docker compose -f ${DOCKER_COMPOSE_FILE} up -d --build"
            // wait 8 seconds on Windows
            bat 'powershell -Command "Start-Sleep -s 8"'
            // Use PowerShell to check endpoints — throw on non-success
            bat 'powershell -Command "try { Invoke-WebRequest -UseBasicParsing -Uri http://localhost:8082/api -TimeoutSec 10 -ErrorAction Stop; } catch { Write-Error \"Backend not available\"; exit 1 }"'
            bat 'powershell -Command "try { Invoke-WebRequest -UseBasicParsing -Uri http://localhost:3000 -TimeoutSec 10 -ErrorAction Stop; } catch { Write-Error \"Frontend not available\"; exit 1 }"'
          }
        }
      }
    }

    stage('Archive artifacts') {
      steps {
        echo 'Archive backend jar and frontend build artifacts'
        archiveArtifacts artifacts: 'backend-app/target/*.jar', allowEmptyArchive: true
        archiveArtifacts artifacts: 'frontend-app/dist/**', allowEmptyArchive: true
      }
    }
  }

    post {
    always {
      echo 'Cleanup: stop compose stack, remove temp mongo, remove jenkins docker network'
      script {
        if (isUnix()) {
          sh "docker compose -f ${DOCKER_COMPOSE_FILE} down --volumes || true"
          sh 'docker rm -f jenkins-mongo || true'
          sh 'docker network rm jenkins-net || true'
        } else {
          bat "docker compose -f ${DOCKER_COMPOSE_FILE} down --volumes || exit 0"
          bat 'docker rm -f jenkins-mongo || echo no-jenkins-mongo'
          bat 'docker network rm jenkins-net || echo no-jenkins-net'
        }
      }
      // Useful debug: print container status
      script {
        if (isUnix()) {
          sh 'docker ps -a || true'
        } else {
          bat 'docker ps -a || echo no-docker'
        }
      }
    }
    success {
      echo 'Pipeline succeeded — artifacts archived and smoke tests passed.'
    }
    failure {
      echo 'Pipeline failed — check logs above to see failing stage(s).'
    }
  }
}
