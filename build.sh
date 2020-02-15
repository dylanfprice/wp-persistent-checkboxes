#!/bin/sh
set -e

rm -r build || true

npm install
npm run lint
npm run test
npm run build
cd build
mkdir -p persistent-checkboxes/build/
cp index.js index.asset.php persistent-checkboxes/build/
cp ../index.php persistent-checkboxes/
zip -r persistent-checkboxes.zip persistent-checkboxes/
