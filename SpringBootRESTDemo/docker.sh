docker stop spring-boot-rest-demo
docker rm spring-boot-rest-demo
docker rmi spring-boot-rest-demo-image
docker build -f Dockerfile -t spring-boot-rest-demo-image .
# docker run -d --name spring-boot-rest-demo -p 8080:8080 --link 518d15d36c23:localhost spring-boot-rest-demo-image