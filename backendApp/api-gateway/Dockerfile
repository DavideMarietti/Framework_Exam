FROM adoptopenjdk/openjdk11
EXPOSE 9191
ARG DEPENDENCY=target
ADD ${DEPENDENCY}/*.jar api-gateway.jar
ENTRYPOINT ["java","-jar","/api-gateway.jar"]
