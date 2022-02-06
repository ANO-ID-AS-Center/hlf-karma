#!/bin/bash

CHAINCODE_NAME=$1
CHAINCODE_CONSTRUCTOR=$2

CHANNEL_NAME=$3

PEER_CONN_PARAMS=$4
ORG_VARS=$5
ORDERER_VARS=$6

set -x

docker exec ${ORG_VARS} cli peer chaincode invoke \
  ${ORDERER_VARS} \
  --channelID "${CHANNEL_NAME}" \
  --name "${CHAINCODE_NAME}" \
  --ctor ${CHAINCODE_CONSTRUCTOR} \
  --isInit \
  ${PEER_CONN_PARAMS}
