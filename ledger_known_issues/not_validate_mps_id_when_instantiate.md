Когда мы делаем instantiate для чейнкода - мы указываем Endorsment Policy в виде
`-P "AND('Org1MSP.member', 'Org2MSP.member')"`. Так вот эта штука никак не валидируется на предмет того, что существуют на самом деле такие айдишники Org1MSP и Org2MSP.
То есть можно написать просто `-P "AND('Hui.member', 'IEgoDrug.member')"` и нам позволят сделать instantiate.
Ошибку мы получим только на момент инвока какой-нибудь транзакции, вот с такими логами

```bash
peer1.org2.example.com | [vscc] Validate -> ERRO 00a VSCC error: stateBasedValidator.Validate failed, err validation of endorsement policy for chaincode main in tx 9:0 failed: signature set did not satisfy policy
peer1.org2.example.com | [committer.txvalidator] validateTx -> ERRO 00b VSCCValidateTx for transaction txId = 8ee4560953e833c9eb3d7b6251ab9dfd7aaf41ebba719209d731c942cd0d4d6b returned error: validation of endorsement policy for chaincode main in tx 9:0 failed: signature set did not satisfy policy
peer1.org2.example.com | [valimpl] preprocessProtoBlock -> WARN 00c Channel [mychannel]: Block [9] Transaction index [0] TxId [8ee4560953e833c9eb3d7b6251ab9dfd7aaf41ebba719209d731c942cd0d4d6b] marked as invalid by committer. Reason code [ENDORSEMENT_POLICY_FAILURE]
peer0.org1.example.com | [vscc] Validate -> ERRO 009 VSCC error: stateBasedValidator.Validate failed, err validation of endorsement policy for chaincode main in tx 9:0 failed: signature set did not satisfy policy
peer0.org1.example.com | [committer.txvalidator] validateTx -> ERRO 00a VSCCValidateTx for transaction txId = 8ee4560953e833c9eb3d7b6251ab9dfd7aaf41ebba719209d731c942cd0d4d6b returned error: validation of endorsement policy for chaincode main in tx 9:0 failed: signature set did not satisfy policy
peer0.org1.example.com | [valimpl] preprocessProtoBlock -> WARN 00b Channel [mychannel]: Block [9] Transaction index [0] TxId [8ee4560953e833c9eb3d7b6251ab9dfd7aaf41ebba719209d731c942cd0d4d6b] marked as invalid by committer. Reason code [ENDORSEMENT_POLICY_FAILURE]
peer0.org2.example.com | [vscc] Validate -> ERRO 00c VSCC error: stateBasedValidator.Validate failed, err validation of endorsement policy for chaincode main in tx 9:0 failed: signature set did not satisfy policy
peer0.org2.example.com | [committer.txvalidator] validateTx -> ERRO 00d VSCCValidateTx for transaction txId = 8ee4560953e833c9eb3d7b6251ab9dfd7aaf41ebba719209d731c942cd0d4d6b returned error: validation of endorsement policy for chaincode main in tx 9:0 failed: signature set did not satisfy policy
peer1.org1.example.com | [vscc] Validate -> ERRO 00e VSCC error: stateBasedValidator.Validate failed, err validation of endorsement policy for chaincode main in tx 9:0 failed: signature set did not satisfy policy
peer0.org2.example.com | [valimpl] preprocessProtoBlock -> WARN 00e Channel [mychannel]: Block [9] Transaction index [0] TxId [8ee4560953e833c9eb3d7b6251ab9dfd7aaf41ebba719209d731c942cd0d4d6b] marked as invalid by committer. Reason code [ENDORSEMENT_POLICY_FAILURE]
peer1.org1.example.com | [committer.txvalidator] validateTx -> ERRO 00f VSCCValidateTx for transaction txId = 8ee4560953e833c9eb3d7b6251ab9dfd7aaf41ebba719209d731c942cd0d4d6b returned error: validation of endorsement policy for chaincode main in tx 9:0 failed: signature set did not satisfy policy
peer1.org1.example.com | [valimpl] preprocessProtoBlock -> WARN 010 Channel [mychannel]: Block [9] Transaction index [0] TxId [8ee4560953e833c9eb3d7b6251ab9dfd7aaf41ebba719209d731c942cd0d4d6b] marked as invalid by committer. Reason code [ENDORSEMENT_POLICY_FAILURE]
```

То есть несоответствие политик.
