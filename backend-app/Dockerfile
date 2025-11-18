FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy maven files first for better caching
COPY pom.xml ./
COPY .mvn .mvn
COPY mvnw ./

# Copy source and build
COPY src ./src
# Skip test compilation and execution inside the image to avoid missing test dependencies
RUN mvn -B -Dmaven.test.skip=true package

FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app

# Copy jar from build stage (assumes one fat jar in target)
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8082
ENTRYPOINT ["java","-jar","/app/app.jar"]
