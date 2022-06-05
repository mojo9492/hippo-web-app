#!/bin/bash

echo "here are the list of tags"
sleep 2

git tag
read -p "enter the version to tag " tag

git tag $tag # tag for git

(cd client || exit && yarn build)

rm -rf .api/public/views

cp -r ./client/dist/. ./api/public/views

echo "version: $tag completed"
