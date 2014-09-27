#! /usr/local/bin/zsh

# first import the datasets
mongoimport -d photos -c albums data/final7/albums.json
mongoimport -d photos -c images data/final7/images.json

