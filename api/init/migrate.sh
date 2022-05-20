#!/bin/bash
read -p "what do you want to name the migration" migration

yarn prisma migrate dev --name $migration