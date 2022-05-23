#!/bin/bash

echo "here are the list of tags"
sleep 3

git tag
read -p "enter the version to tag " tag

rm -rf client/dist
rm -rf api/public/views

(cd client || exit && yarn build)

cp -r ./client/dist/. ./api/public/views


echo "version: $tag completed"

git tag $tag # tag for git