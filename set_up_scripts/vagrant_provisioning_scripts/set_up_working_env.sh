#!/bin/bash

# Set up an isolated virtualenv environment for code
virtualenv venv
. venv/bin/activate
pip3 install -r /vagrant/requirements.txt
# Creating a symbolic link so that the script can find the
# vagrant folder correctly (i.e. via a home directory path)
cd /vagrant
python3 set_up_scripts/create_db.py
cd -
