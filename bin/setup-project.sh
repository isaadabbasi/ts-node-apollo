#! /bin/bash

cp .env.sample .env
docker-compose up -d
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
mv jwtRS256.key ./bin
mv jwtRS256.key.pub ./bin