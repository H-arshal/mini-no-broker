# Use a base image with Java 17
FROM openjdk:17-jdk-alpine

# Set working directory inside the container
WORKDIR /app

# Copy the JAR file into the image
COPY target/server-0.0.1-SNAPSHOT.jar /app/server.jar

# Expose the port that Spring Boot runs on
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "server.jar"]
