read -p " <test>
 1. api
 2. client 
 what suite would you like to test? " suite

if [[ $suite == 1 ]]; then
    echo 'api: starting tests'
    (cd api && yarn test)
elif [[ $suite == 2 ]]; then
    echo 'client: starting tests'
else
    echo 'invalid choice'
    exit 1
fi
