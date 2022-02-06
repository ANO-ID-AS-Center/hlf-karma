#!/bin/bash

CHAINCODE_NAME=$1
CHAINCODE_VERSION=$2
CHAINCODE_SEQUENCE=$3

CHANNEL_NAME=$4

PEER_CONN_PARAMS=$5
ORG_VARS=$6
ORDERER_VARS=$7

set -x

docker exec ${ORG_VARS} cli peer lifecycle chaincode commit \
  ${ORDERER_VARS} \
  --channelID "${CHANNEL_NAME}" \
  --name "${CHAINCODE_NAME}" \
  --version "${CHAINCODE_VERSION}" \
  --sequence "${CHAINCODE_SEQUENCE}" \
  --init-required \
  ${PEER_CONN_PARAMS}
