# Use a base JDK image
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml first to leverage Docker cache
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy all source files
COPY . .

# Build the application
RUN ./mvnw clean package -DskipTests

# Run the jar file
CMD ["java", "-jar", "target/*.jar"]
