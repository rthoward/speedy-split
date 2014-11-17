sudo apt-get update
sudo apt-get install -y build-essential zsh vim git nodejs npm rbenv ruby-build
sudo npm install -g bower

# install oh-my-zsh, then install dotfiles
curl -L http://install.ohmyz.sh | sh
cd /vagrant
git clone https://github.com/a-out/dotfiles.git
cp -Rfv dotfiles/{.zshrc,.gitconfig} ~/
rm -rfv /vagrant/dotfiles