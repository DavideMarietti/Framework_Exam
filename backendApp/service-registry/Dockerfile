FROM adoptopenjdk/openjdk11
EXPOSE 8761
ARG DEPENDENCY=target
ADD ${DEPENDENCY}/*.jar service-registry.jar
ENTRYPOINT ["java","-jar","/service-registry.jar"]