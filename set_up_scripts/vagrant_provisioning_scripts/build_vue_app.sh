#!/usr/bin/env bash

# Purpose is to build vue application for Python Flask
cd /vagrant/vue-ui
npm install
npm run build
cd -
