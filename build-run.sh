#!/bin/bash

sh ./build.sh 2>&1 || echo "could not build"

docker compose -f docker-compose.prod.yaml down
docker compose -f docker-compose.prod.yaml up --build -d
