#!/usr/bin/env bash

sudo apt update
sudo apt install -y build-essential checkinstall libssl-dev zlib1g-dev libncurses5-dev libncursesw5-dev libreadline-dev libsqlite3-dev libgdbm-dev libdb5.3-dev libbz2-dev libexpat1-dev liblzma-dev tk-dev libffi-dev
wget https://www.python.org/ftp/python/3.6.2/Python-3.6.2.tgz
tar xvf Python-3.6.2.tgz
cd Python-3.6.2
./configure
make
sudo make install
sudo pip3 install virtualenv
