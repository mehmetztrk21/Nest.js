
#docker build -t mongo .
#docker run -d -p 27017:27017 --name mongo_container mongo
FROM mongo:latest

ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=admin
ENV MONGO_INITDB_DATABASE=nestjs
EXPOSE 27017