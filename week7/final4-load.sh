#! /usr/local/bin/zsh

# first import the dataset
mongoimport --drop -d blog -c posts  data/posts.f52bca51f2fb.json

