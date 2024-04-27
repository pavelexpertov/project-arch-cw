#!/usr/bin/env bash

# the purpose of the script is to run individual set up scripts so
# vagrant file is not overloaded with provisioned files.

sudo apt-get update
echo "Installing Node"
sh /vagrant/set_up_scripts/vagrant_provisioning_scripts/set_up_node_npm.sh
echo "Installing MongoDB"
sh /vagrant/set_up_scripts/vagrant_provisioning_scripts/set_up_mongodb.sh
echo "Build vue application"
sh /vagrant/set_up_scripts/vagrant_provisioning_scripts/build_vue_app.sh
echo "Start up the backend"
sh /vagrant/set_up_scripts/vagrant_provisioning_scripts/install_and_run_backend_app.sh
