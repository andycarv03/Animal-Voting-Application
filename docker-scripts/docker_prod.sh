#!/bin/bash

cd "$(dirname "$0")/.."

case "$1" in
  up)
    docker-compose -f docker-compose.yaml up
    ;;
  down)
    docker-compose -f docker-compose.yaml down -v
    ;;
  build)
    docker-compose -f docker-compose.yaml up --build
    ;;
  test)
    docker-compose -f docker-compose.yaml run seed-data
    ;;
  health)
    docker-compose -f docker-compose.yaml run service_check
    ;;
  *)
    echo "Usage: docker_prod.sh {up|down|build|test|health}"
    ;;
esac