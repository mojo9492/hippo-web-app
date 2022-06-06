#!/bin/bash

(cd client || exit && yarn build)

rm -rf ./api/public/views

cp -r ./client/dist/. ./api/public/views
