#!/bin/bash
docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD";
docker push resourcepool/aloha-client-website:$TRAVIS_BUILD_NUMBER
docker push resourcepool/aloha-client-website:latest