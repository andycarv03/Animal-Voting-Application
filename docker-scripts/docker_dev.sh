#!/bin/bash

cd "$(dirname "$0")/.."

case "$1" in
  up)
    docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up
    ;;
  down)
    docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml down -v
    ;;
  build)
    docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up --build
    ;;
  *)
    echo "Usage: docker_dev.sh {up|down|build}"
    ;;
esac