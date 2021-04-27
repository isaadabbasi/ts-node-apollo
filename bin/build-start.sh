#! /bin/bash

rm -rf dist
npm run build
cp ./src/graphql/schema/*.graphql ./dist/graphql/schema/
npm run start 