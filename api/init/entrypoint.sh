#!/bin/bash

yarn prisma generate

yarn prisma db seed

yarn start
