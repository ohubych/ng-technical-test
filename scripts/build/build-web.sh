#!/usr/bin/env bash

function usage() {
  bold=$(tput bold)
  normal=$(tput sgr0)
  echo "NAME"
  echo "    build-web.sh"
  echo "SYNOPSIS"
  echo "    ${bold}build-mac.sh${normal}"
}

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR"

VERSION=$(./build/helpers/get-version.sh ../package.json)

if [[ -z ${VERSION} ]]; then
  usage
  exit 1
fi

PROJECT_NAME=$(./build/helpers/get-name.sh ../package.json)

if [[ -z ${PROJECT_NAME} ]]; then
  usage
  exit 1
fi

CLIENT_WEB_PATH=${PROJECT_NAME}-client-web-${VERSION}

echo "---------- clean ----------"
yarn run clean

echo "----------yarn run build ----------"
yarn run build:web
