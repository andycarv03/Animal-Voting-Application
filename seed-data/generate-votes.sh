#!/bin/sh

vote="$1"

if [ "$1" == "" ];then
    vote="vote"
fi

# create votes
ab -n 10 -c 5 -p posta -T "application/x-www-form-urlencoded" http://${vote}/
ab -n 10 -c 5 -p postb -T "application/x-www-form-urlencoded" http://${vote}/
ab -n 10 -c 5 -p posta -T "application/x-www-form-urlencoded" http://${vote}/
ab -n 5 -c 2 -p postc -T "application/x-www-form-urlencoded" http://${vote}/
ab -n 10 -c 5 -p postb -T "application/x-www-form-urlencoded" http://${vote}/
ab -n 20 -c 10 -p posta -T "application/x-www-form-urlencoded" http://${vote}/
ab -n 10 -c 5 -p postd -T "application/x-www-form-urlencoded" http://${vote}/
ab -n 10 -c 5 -p postd -T "application/x-www-form-urlencoded" http://${vote}/


