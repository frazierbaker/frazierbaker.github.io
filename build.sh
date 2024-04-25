#!/bin/bash

rm -rf dist
mkdir -p dist

for x in $(ls *.mustache | sed -e 's/.mustache//g'); do
    yarn mustache data.json $x.mustache | tail -n +3 | head -n -1 | tee dist/$x;
done

cp -R static dist
