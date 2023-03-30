FROM adoptopenjdk/openjdk11
#RUN addgroup -S spring && adduser -S spring -G spring
#VOLUME /tmp
EXPOSE 8082
ARG DEPENDENCY=target
ADD ${DEPENDENCY}/*.jar comment-service.jar
ENTRYPOINT ["java","-jar","comment-service.jar"]
