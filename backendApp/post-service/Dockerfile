FROM adoptopenjdk/openjdk11
#RUN addgroup -S spring && adduser -S spring -G spring
#VOLUME /tmp
EXPOSE 8081
ARG DEPENDENCY=target
ADD ${DEPENDENCY}/*.jar post-service.jar
ENTRYPOINT ["java","-jar","/post-service.jar"]
