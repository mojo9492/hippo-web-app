#!/bin/bash

read -p "do you need to build? [y/n] " willBuild

if [[ $willBuild == 'y' ]]; then
    sh ./build.sh
else 
    echo "build stage skipped...\n"
fi

echo 'clearing node_modules and compressing project...\n'

rm -rf client/node_modules
rm -rf api/node_modules

tar -czvf ./artifacts/hippo-web-app.tgz .

echo 'starting transfer procedure...\n'
expect > /dev/null <<EOF
    spawn sftp suse@192.168.50.233
    expect "password:"
    send "Suse92$"
    expect "sftp>"
    send "rm hippo-web-app.tgz"
    send "put ./artifacts/hippo-web-app.tgz"
    expect "sftp>"
    send "exit\n"
    interact
EOF

if [ $? -ne 0 ]; then 
    echo "error deploying to vm\n"
    sleep 3
    exit 1
else
    echo "transfer complete\n\n"
fi

echo "establishing connection to host...\n"
expect > /dev/null <<EOF
    spawn ssh suse@192.168.50.233
    expect "(suse@192.168.50.233) Password:"
    send "Suse92$"
    expect "suse@localhost:~>"
    send "tar -xvzf hippo-web-app.tgz"
    send "cd hippo-web-app"
    send "docker-compose -f docker-compose.prod.yaml up --build -d"
    send "exit\n"
    interact
EOF

if [ $? -ne 0 ]; then
    echo "error starting instance\n"
    sleep 3
    exit 1
else 
    echo "deployment successful\n\n"
fi

echo "adding back dependencies..."
(cd client && yarn)
(cd api && yarn)
echo "done\n\n"
exit 0