#!/bin/bash

CHAINCODE_NAME=$1
CHAINCODE_VERSION=$2
CHAINCODE_SEQUENCE=$3

CHANNEL_NAME=$4
ORG_VARS=$5
ORDERER_VARS=$6


docker exec cli peer lifecycle chaincode queryinstalled &>installed.txt
PACKAGE_ID=$(sed -n "/${CC_NAME}_${CC_VERSION}/{s/^Package ID: //; s/, Label:.*$//; p;}" installed.txt)

set -x
docker exec ${ORG_VARS} cli peer lifecycle chaincode approveformyorg \
  ${ORDERER_VARS} \
  --channelID "${CHANNEL_NAME}" \
  --name "${CHAINCODE_NAME}" \
  --version "${CHAINCODE_VERSION}" \
  --package-id "${PACKAGE_ID}" \
  --sequence "${CHAINCODE_SEQUENCE}" \
  --init-required
