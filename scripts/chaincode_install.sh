#!/bin/bash

CHAINCODE_NAME=$1
CHAINCODE_PATH=$2

ORG_VARS=$3

PACKAGE_FILE_PATH="${CHAINCODE_PATH}/${CHAINCODE_NAME}.tar.gz"

set -x
docker exec ${ORG_VARS} cli peer lifecycle chaincode install "${PACKAGE_FILE_PATH}"
