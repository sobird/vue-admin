#!/bin/bash
# @author  Yang,junlong at 2018-11-23 13:36:18 build.
# @version $Id$
#

PRO_PATH=$HOME/webroot/vue-element-pro

rm -rf dist 

npm run local

rm -rf $PRO_PATH
cp -r dist/ $PRO_PATH
