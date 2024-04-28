#!/usr/bin/env bash

# Import the public key used by the package management system
wget -qO - https://www.mongodb.org/static/pgp/server-3.6.asc | sudo apt-key add -
# Create a list file for MongoDb
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
# Reload local package database
sudo apt-get update
# Installing a specific version of mongodb
sudo apt-get install -y --allow-unauthenticated mongodb-org=3.6.2 mongodb-org-server=3.6.2 mongodb-org-shell=3.6.2 mongodb-org-mongos=3.6.2 mongodb-org-tools=3.6.2
# Starting deamon
sudo service mongod start

# Restore original database
mongorestore -d tripdb /vagrant/mongo_backup/initial_backup/tripdb
