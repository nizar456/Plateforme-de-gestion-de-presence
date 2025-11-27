// Declarative Jenkinsfile pipeline for full project CI (backend + frontend + docker + smoke tests)
pipeline {
  agent any

  environment {
    // image tags (change to your registry if you want to push)
    BACKEND_IMAGE = "nosql-backend:${env.BUILD_NUMBER}"
    FRONTEND_IMAGE = "nosql-frontend:${env.BUILD_NUMBER}"
    DOCKER_COMPOSE_FILE = 'docker-compose.yml'
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
            def mvnImage = docker.image('maven:3.9.6-eclipse-temurin-21')
            mvnImage.pull()
            mvnImage.inside("--network jenkins-net -e MAVEN_OPTS='-Xmx1g'") {
              // If some tests are slow or require DB, keep them; adjust flags if you want to skip slow integration tests.
              // run maven specifically using backend-app's pom so it works even at repo root
              sh 'mvn -B -f backend-app/pom.xml -DskipTests=false clean test package'
            }
          } else {
            // On Windows agents we attempt to run mvn from the node (ensure maven is installed there)
            // run maven from the backend module (use -f so no cd needed)
            bat 'mvn -B -f backend-app/pom.xml -DskipTests=false clean test package'
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
                // frontend tests removed by request — skip npm test and only build
                // Build production bundle
                sh 'cd frontend-app && npm run build'
            }
          } else {
            // On Windows agent: try running npm locally (requires node installed). Use powershell if needed.
            bat 'cd frontend-app && npm ci'
              // frontend tests removed by request — skip npm test and only build
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

            // wait & retry for backend health endpoint
            def backendOk = false
            for (int i = 0; i < 30; ++i) {
              def status = sh(script: "curl -sSf http://localhost:8082/api > /dev/null 2>&1", returnStatus: true)
              if (status == 0) { backendOk = true; break }
              echo "Backend not yet available (attempt ${i+1}/30)"
              sh 'sleep 2'
            }
            if (!backendOk) {
              echo 'Backend failed to become available — printing docker-compose ps and backend logs'
              sh "docker compose -f ${DOCKER_COMPOSE_FILE} ps"
              sh "docker compose -f ${DOCKER_COMPOSE_FILE} logs --no-color backend || true"
              error 'Backend unavailable after retries'
            }

            // Quick check for frontend
            def frontStatus = sh(script: "curl -sSf http://localhost:3000 > /dev/null 2>&1", returnStatus: true)
            if (frontStatus != 0) {
              echo 'Frontend not available — collecting logs'
              sh "docker compose -f ${DOCKER_COMPOSE_FILE} logs --no-color frontend || true"
              error 'Frontend unavailable'
            }
          } else {
            bat "docker compose -f ${DOCKER_COMPOSE_FILE} up -d --build"

            // Windows: wait & retry backend using PowerShell with short timeout
            def backendOk = false
            for (int i = 0; i < 30; ++i) {
              def rc = bat(returnStatus: true, script: "powershell -Command \"try { Invoke-WebRequest -UseBasicParsing -Uri http://localhost:8082/api -TimeoutSec 3 -ErrorAction Stop; exit 0 } catch { exit 1 }\"")
              if (rc == 0) { backendOk = true; break }
              echo "Backend not yet available (attempt ${i+1}/30)"
              bat 'powershell -Command "Start-Sleep -s 2"'
            }
            if (!backendOk) {
              echo 'Backend failed to become available on Windows — printing docker-compose ps and backend logs'
              bat "docker compose -f ${DOCKER_COMPOSE_FILE} ps"
              bat "docker compose -f ${DOCKER_COMPOSE_FILE} logs --no-color backend || exit 0"
              error 'Backend unavailable after retries (Windows)'
            }

            // Frontend quick check on Windows
            def rc2 = bat(returnStatus: true, script: "powershell -Command \"try { Invoke-WebRequest -UseBasicParsing -Uri http://localhost:3000 -TimeoutSec 3 -ErrorAction Stop; exit 0 } catch { exit 1 }\"")
            if (rc2 != 0) {
              echo 'Frontend not available on Windows — collecting logs'
              bat "docker compose -f ${DOCKER_COMPOSE_FILE} logs --no-color frontend || exit 0"
              error 'Frontend unavailable (Windows)'
            }
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
