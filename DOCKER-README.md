# Docker instructions
build docker image:
```shell
docker build -t rouzzlan/taco-angular:latest . 
```
build container from image:
```shell
docker run -d -it -p 80:80/tcp --name angular-app rouzzlan/taco-angular:latest
```
push to dockerhub:
```shell
docker push rouzzlan/taco-angular:latest
```
