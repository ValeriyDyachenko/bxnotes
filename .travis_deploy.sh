#!/bin/sh

for f in *; do
    if [ $f != "_site" ]
      then
        if [ -d $f ]
          then
            rm -rf $f
          else
            rm $f
        fi     
    fi
done

cp -r ./_site/* ./
rm -rf _site
rm -rf .git
git init
git config --global user.email "bxnotes@travis-ci.org"
git config --global user.name "Travis CI"
git remote add origin https://ValeriyDyachenko:${BXN_TOKEN}@github.com/ValeriyDyachenko/bxnotes_dist.git > /dev/null 2>&1
git checkout -b deploy
git add .
git commit -m "Travis build $TRAVIS_BUILD_NUMBER"
git push origin +deploy --quiet
sshpass -p${BXN_PASS} ssh -o StrictHostKeyChecking=no ${BXN_UNAME}@${BXN_HOST} "cd ${BXN_PATH}; git fetch --all; git reset --hard upstream/master;"
