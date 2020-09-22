#!/bin/sh
SHA=$(git rev-parse HEAD) 
THIS_BRANCH=$(git rev-parse --abbrev-ref HEAD)
VERSION=$(npm ls ~ | grep -o "[0-9]*\.[0-9]*\.[0-9]*")

DIST=dist
REMOTE=origin
BRANCH=gh-pages
BIN=node_modules/.bin

npm run build

git checkout ${BRANCH}
git rm -rf api static
cp -r ${DIST}/* ./

if (( $THIS_BRANCH == master ))
then
    git add .
    git commit -n -am "Auto build from ${SHA}"
    git push ${REMOTE} ${BRANCH}
    git checkout ${THIS_BRANCH}
fi
