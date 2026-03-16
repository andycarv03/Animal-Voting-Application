# Application to vote for your favorite animals

A simple distributed application. Code reference from : https://github.com/dockersamples/example-voting-app

The original application has been tweaked to add new categories of animals and optimised for faster write operations into the database when processing data from the redis.

## Getting started

This solution uses Python, Node.js, .NET, with Redis for messaging and Postgres for storage.

### Components of this application :

vote/ \
    This is your frontend application enabling users to cast their votes. Developed using Python's framework Flask.

worker/ \
    This is the worker thread written in .NET responsible for processing votes and writing into the database

result/ \
    This is node server running to display votes in real-time.

seed-data/ \
    Use this to simulate dummy vote data. Check test-details.txt on how to test.

healthchecks/ \
    These are scripts used to confirm health status of your postgres db and redis services.

### How to get started

#### To run this application on your host machine (Linux Ubuntu):

Step 1) Clone repo :
> git clone https://github.com/andycarv03/Animal-Voting-Application.git

Step 2) Install Redis server :
> sudo apt install redis-server \
> sudo systemctl start redis 

Test: redis-cli ping

Step 3) Install PostgresSQL :
> sudo -i -u postgres \
> psql \
> CREATE DATABASE votes;

Step 4) Running the front-end web app :
> cd vote/ \
> pip install -r requirements.txt \
> python app.py 

Access in browser: http://localhost:5000

Step 5) Running the Result service :
> cd result/  
> npm install \
> npm start 

Access in browser: http://localhost:5001

Step 6) Running the worker :
> cd worker/ \
> dotnet build \
> dotnet run 

## Architecture

![Architecture diagram](architecture.excalidraw.png)

* A front-end web app in [Python](/vote) which lets you vote between categories of animals.
* A [Redis](https://hub.docker.com/_/redis/) which collects new votes.
* A [.NET](/worker/) worker which consumes votes and stores them in.
* A [Postgres](https://hub.docker.com/_/postgres/) database for persistent storage.
* A [Node.js](/result) web app which shows the results of the voting in real time.

## Notes

This voting application only accepts one vote per client browser. It does not register additional votes if a vote has already been submitted from a client browser.

This isn't an example of a properly architected perfectly designed distributed app... it's just a simple
example of the various types of pieces and languages you might see (queues, persistent data, etc), and how to
deal with them at a basic level.
