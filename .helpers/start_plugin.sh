#!/bin/zsh
USER_HOME=/Users/4275019
SUPERSET_HOME=${USER_HOME}/Repos/pharos/pharos-superset
PLUGIN_HOME=${USER_HOME}/Workspace/superset-plugins

cd ${PLUGIN_HOME}/waterfall-anieshaz-plugin

# install process module
echo "Installing process"
# npm install --save-dev process --force

# install react dom
# npm install react react-dom --save --force

# install the dependency module
# echo "~~~~~~~Installing Ant~~~~~~~~~"
# npm install @ant-design/plots --force

# install packages and run in dev mode
npm ci --force && \
npm run dev