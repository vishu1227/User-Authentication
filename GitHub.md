# Git hub Commands

```
git config --global user.name 'Bharat Bhusan'
git config --global user.email 'bh27122000@gmail.com'
touch .gitignore
git init
git commit -m "Initial commit"
git status
git remote add origin <!--Git hub repository SSHto which we want to add-->

<!-- If we does not have any SSH key -->
ssh-keygen -t ed25519 -C "bh27122000@gmail.com"
cat /home/bharat/.ssh/id_ed25519.pub

git push origin master
```

To update the project at git hub

```
git status
git add .
git commit -m "Some message"
git push origin master
```
