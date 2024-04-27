# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-16.04"
  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.provision :shell,
    inline: "sh /vagrant/set_up_scripts/vagrant_provisioning_scripts/run.sh"
    #inline: "sh /vagrant/set_up_scripts/vagrant_provisioning_scripts/set_up_node_npm.sh"

end
