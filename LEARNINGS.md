# Project Overview
This project is a containerized multi-service application used to understand core DevOps concepts such as containerization, service orchestration, config-driven system and CI workflows.

# Key Learnings

### 1. Containerization
+ Learned how to containerize multiple services using __Docker__
+ Wrote __Dockerfiles__ for different components
+ Understood __image building__ and container lifecycle

### 2. Multi-Container Orchestration
+ Used __Docker Compose__ to define and run services
+ Managed networking between services (service name resolution)
+ Coordinated startup of dependent service (healthcheck, data seeding for tests)

### 3. System Architecture
+ Understood the __flow of data__ across services
__Frontend__ -> __Redis__ - > __Worker__ -> __PostgresSQL__ -> __Result service__
+ Learned how async processing works using Redis
+ Used PostgresSQL for persistent storage

### 4. Configuration Management
+ Removed hardcoded values and moved then to environment variables
+ Used __.env__ files and Docker Compose environment configs
+ Made system behavior configurable (eg, can change the input category values via config)

### 5. Development vs Runtime Environments
+ Created separate __docker-compose.dev.yaml__ for development
+ Used __bind mounts for live source coding__
+ Maintained clean separation between dev and base environments

### 6. Developer Workflow Optimization
+ Create __shell scripts__ to simplify Docker commands
+ Improved development efficiency with hotreload enabled for the services

### 7. Testing and Simulation
+ Built conatiners to simulate voting traffic
+ Added scripts to test connectivity of redis and database

### 8. CI/CD Basics
+ Implemented basic workflows for slack notification on repository events using __GitHub Actions__

### 9. Performance and Debugging
+ Identified slow DB writes and optimized them.
+ Modified application behavior and validated erro inputs

## Tool and Technologies Used
+ Docker
+ Docker Compose
+ Redis
+ PostgresSQL
+ Python, Node.js,.NET
+ GitHub Actions

## Key Takeaways
+ Systems should be config-driven, not hardcoded
+ Containerization enables consistent environments
+ Multi-service system require clear communication and data flow
+ Developer experience is important for productivity
+ Used CI workflows to automate notifications on repository events