#!/bin/sh

# Install modules
echo "Installing missing dependencies"
yarn install

exec "$@"
