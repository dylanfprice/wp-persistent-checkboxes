#!/bin/sh
set -e

rm -r build || true

npm install
npm run lint
npm run test
npm run build
cd build
mkdir -p wp-persistent-checkboxes/build/
cp index.js index.asset.php wp-persistent-checkboxes/build/
cp ../index.php wp-persistent-checkboxes/
zip -r wp-persistent-checkboxes.zip wp-persistent-checkboxes/
