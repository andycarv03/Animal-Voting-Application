#!/bin/bash
echo "------------------------------"
echo "Testing Redis connectivity."
./redis.sh "voting_redis"

echo "------------------------------"
echo "Testing PostgresDb connectivity. Please enter your password when prompted"
./postgres.sh "voting_database"