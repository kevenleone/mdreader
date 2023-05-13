#!/bin/bash

echo "Removing Node Modules..."

rm -rf node_modules
rm -rf apps/**/node_modules
rm -rf packages/**/node_modules

yarn install

echo "Finish..."
