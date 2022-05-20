#!/bin/bash

yarn prisma generate

chmod 700 prisma/seed.ts

yarn prisma db seed

yarn prisma studio &

yarn start
