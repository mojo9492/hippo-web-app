#!/bin/bash

echo "migration started"
yarn prisma migrate dev

echo "seeding started"
chmod 700 prisma/seed.ts

yarn prisma db seed


echo "starting app..."
export NODE_ENV=production 

yarn start
