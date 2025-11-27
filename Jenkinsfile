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
    // faster failure detection
    ansiColor('xterm')
  }

  stages {
    stage('Checkout') {
      steps {
        echo 'Checkout source code'
        checkout scm
      }
    }

    stage('Prepare services') {
      steps {
        echo "Create docker network and start a temporary mongo for tests"
        sh 'docker network create jenkins-net || true'
        sh "docker run -d --name jenkins-mongo --network jenkins-net -e MONGO_INITDB_DATABASE=university_auth mongo:6.0"
      }
    }

    stage('Backend: build & unit tests') {
      steps {
        echo 'Using official maven+java21 container to build and run tests'
        script {
          // Use the maven docker image and attach it to the same docker network so tests can access mongo
          def mvnImage = docker.image('maven:3.9.6-eclipse-temurin-21')
          mvnImage.pull()
          mvnImage.inside("--network jenkins-net -e MAVEN_OPTS='-Xmx1g'") {
            // If some tests are slow or require DB, keep them; adjust flags if you want to skip slow integration tests.
            sh 'mvn -B -DskipTests=false clean test package'
          }
        }
      }
    }

    stage('Frontend: install, test & build') {
      steps {
        echo 'Install node deps, run frontend tests and build static bundle'
        script {
          def nodeImage = docker.image('node:18-alpine')
          nodeImage.pull()
          nodeImage.inside('--network jenkins-net') {
            sh 'cd frontend-app && npm ci'

            // Run frontend tests if you have any (fail pipeline if tests fail)
            sh 'cd frontend-app && npm test'

            // Build production bundle
            sh 'cd frontend-app && npm run build'
          }
        }
      }
    }

    stage('Build Docker images (local)') {
      steps {
        echo 'Build backend and frontend docker images (tagged with build number)'
        sh 'docker build -t ${BACKEND_IMAGE} ./backend-app'
        sh 'docker build -t ${FRONTEND_IMAGE} ./frontend-app'
      }
    }

    stage('Integration: compose up & smoke tests') {
      steps {
        echo 'Start stack with docker-compose and run a few smoke checks (health endpoints)'
        // Allow failures to be visible as pipeline fails if a smoke-test fails
        sh "docker compose -f ${DOCKER_COMPOSE_FILE} up -d --build"
        // wait for services to come up (adjust timeout as needed)
        sh 'sleep 8'
        // 1) Check backend health (if your app exposes a health endpoint)
        sh 'curl -sSf http://localhost:8082/api || (echo "Backend not available" && exit 1)'
        // 2) Check frontend (served by nginx at 3000)
        sh 'curl -sSf http://localhost:3000 || (echo "Frontend not available" && exit 1)'
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
      sh "docker compose -f ${DOCKER_COMPOSE_FILE} down --volumes || true"
      sh 'docker rm -f jenkins-mongo || true'
      sh 'docker network rm jenkins-net || true'
      // Useful debug: print container status
      sh 'docker ps -a || true'
    }
    success {
      echo 'Pipeline succeeded — artifacts archived and smoke tests passed.'
    }
    failure {
      echo 'Pipeline failed — check logs above to see failing stage(s).'
    }
  }
}
