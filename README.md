Socket.io-Redis-Chat-App
===========================

This is the revised work for the basic Node.js - socket.io chat application. This time, I've used Redis to capture all the previous messages. Redis is a data structure server which is open-source, networked, in-memory, and stores keys with optional durability.

Requirements
============

* Node.js
* Express
* Socket.io
* Redis

Usage
======

First, if you haven't already installed Node.js on your machine, download Node.js [here](http://nodejs.org/download/)

Then, download & install dependencies: express, socket.io, redis with the command `npm install`
You may need to install redis server seperately with the command `brew install redis`

Afterwards, you need to start the redis server by typing `redis-server`

Run the application by `node app.js`  on terminal.





