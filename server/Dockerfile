## Use a base JDK image
#FROM eclipse-temurin:17-jdk-alpine
#
## Set working directory
#WORKDIR /app
#
## Copy Maven wrapper and pom.xml first to leverage Docker cache
#COPY .mvn/ .mvn
#COPY mvnw pom.xml ./
#
## Download dependencies
#RUN ./mvnw dependency:go-offline
#
## Copy all source files
#COPY . .
#
## Build the application
#RUN ./mvnw clean package -DskipTests
#
## Run the jar file
#CMD ["java", "-jar", "target/*.jar"]


# Use a base image with JDK 17
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy Maven wrapper files first to leverage Docker cache
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# 🛠️ Give executable permission to mvnw
RUN chmod +x mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy all source files
COPY . .

# Build the application
RUN ./mvnw clean package -DskipTests

# Run the jar file (replace with your actual JAR name)
CMD ["java", "-jar", "target/property-server-0.0.1-SNAPSHOT.jar"]
