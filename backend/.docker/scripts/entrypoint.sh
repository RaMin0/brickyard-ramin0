#!/bin/sh

wait_for_db() {
  counter=0
  while ! nc -z db 5432; do
    counter=$((counter+1))
    if [ $counter == 30 ]; then
      echo "Error: Couldn't connect to Postgres."
      exit 1
    fi
    echo "Attempt #$counter: Trying to connect to Postgres"
    sleep 5
  done
}

echo -e "\nCopying *.yml configs"
cp ./.docker/config/*.yml ./config/

echo -e "\nChecking gems"
bundle install --quiet

echo -e "\nWaiting for database"
wait_for_db
if [ ! -f /var/lib/postgresql/data/db.sem ]; then
  echo -e "Setting up database for first time"
  bundle e rake db:setup
  touch /var/lib/postgresql/data/db.sem
fi
echo -e "Running migrations"
bundle e rake db:migrate

echo -e "Running tests"
bundle e rspec

if [ -f ./tmp/pids/server.pid ]; then
  echo -e "Removing old server PID"
  rm tmp/pids/server.pid
fi
echo -e "\nRunning server"
exec "$@"
