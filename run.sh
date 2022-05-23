#!/bin/bash

echo "building for: $NODE_ENV"

sh ./build.sh 2>&1 || echo "could not build"

docker compose -f docker-compose.prod.yaml up --build -d

open http://localhost:3000
