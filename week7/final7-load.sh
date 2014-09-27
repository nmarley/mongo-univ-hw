#! /usr/local/bin/zsh

# first import the datasets
mongoimport --drop -d photos -c albums data/final7/albums.json
mongoimport --drop -d photos -c images data/final7/images.json

