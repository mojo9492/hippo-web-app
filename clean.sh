#!/bin/bash

docker compose -f docker-compose.prod.yaml down --rmi all -v
docker system prune -a