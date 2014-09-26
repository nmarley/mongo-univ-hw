#! /usr/local/bin/zsh

# first import the dataset
mongorestore -d enron -c messages data/dump/enron/messages.bson

