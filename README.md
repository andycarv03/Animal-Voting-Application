# Application to vote for your favorite categories

A simple distributed application. Code reference from : https://github.com/dockersamples/example-voting-app

The original application has been tweaked to add new voting categories and optimised for faster write operations into the database when processing data from the redis.

## Getting Started

This solution uses Python, Node.js, .NET, with Redis for messaging and Postgres for storage.

## Application Components

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

## How to get started ?
Use docker-compose to spin up the multi-tiered application in containers.

### <ins>To run this application via docker-compose </ins>
```
git clone https://github.com/andycarv03/Animal-Voting-Application.git

git checkout dev_branch

docker-compose up -d
```
docker-compose.yaml contains the configuration to spin up all the service containers required to run this application. User can access the _Voting Page_ and _Result Page_ via _localhost:5000, localhost:5001_ respectively.

Additionally, there are two other service containers that may be used to check the health of redis and postgres db. Test container to send simulated vote data to the database.

Please check docker-compose-commands.txt for more commands.

## Architecture

![Architecture diagram](architecture.excalidraw.png)

* A front-end web app in [Python](/vote) which lets you vote between categories.
* A [Redis](https://hub.docker.com/_/redis/) which collects new votes.
* A [.NET](/worker/) worker which consumes votes and stores them in.
* A [Postgres](https://hub.docker.com/_/postgres/) database for persistent storage.
* A [Node.js](/result) web app which shows the results of the voting in real time.

## Notes

This voting application only accepts one vote per client browser. It does not register additional votes if a vote has already been submitted from a client browser.

This isn't an example of a properly architected perfectly designed distributed app... it's just a simple
example of the various types of pieces and languages you might see (queues, persistent data, etc), and how to
deal with them at a basic level.
