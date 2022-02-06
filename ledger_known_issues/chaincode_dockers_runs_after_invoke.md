Когда мы просто делаем `instantiate` - запускается только один контейнер с чейнкодом.
Если мы потом с какого-либо клиента попробуем послать инвок транзакцию - то только в этот момент пиры начнут билдить свои контейнеры
и только через какое то время уже будут появляться контейнеры с чейнкодом.

Состояние после `instantiate`:
```
CONTAINER ID        IMAGE                                                                                                     COMMAND                  CREATED             STATUS              PORTS                               NAMES
1fe251a8a644        dev-peer0.org1.example.com-main-1.20.0-fee9991ccfdfe40eec71d579b4882d1840ac1f6bd2ded4555045359adb44928c   "/bin/sh -c 'cd /usr…"   5 minutes ago       Up 5 minutes                                            dev-peer0.org1.example.com-main-1.20.0
...Остальные пиры и ордереры
```
Промежуточное состояние после invoke:
```
CONTAINER ID        IMAGE                                                                                                     COMMAND                  CREATED              STATUS              PORTS                               NAMES
283d58b542ae        hyperledger/fabric-ccenv:1.4.7                                                                            "/bin/sh -c 'cp -R /…"   17 seconds ago       Up 14 seconds                                           determined_hoover
498a6e937ca5        hyperledger/fabric-ccenv:1.4.7                                                                            "/bin/sh -c 'cp -R /…"   17 seconds ago       Up 13 seconds                                           lucid_feynman
575130c0fc60        hyperledger/fabric-ccenv:1.4.7                                                                            "/bin/sh -c 'cp -R /…"   17 seconds ago       Up 15 seconds                                           musing_wright
1fe251a8a644        dev-peer0.org1.example.com-main-1.20.0-fee9991ccfdfe40eec71d579b4882d1840ac1f6bd2ded4555045359adb44928c   "/bin/sh -c 'cd /usr…"   About a minute ago   Up About a minute                                       dev-peer0.org1.example.com-main-1.20.0
```
Как видно здесь запускаются три контейнера, которые являются прообразами для чейнкода.

Состояние которое на самом деле нам нужно и которое позволяет нашим инвокам не отваливаться по таймауту:
```
CONTAINER ID        IMAGE                                                                                                     COMMAND                  CREATED             STATUS              PORTS                               NAMES
32201c101263        dev-peer1.org1.example.com-main-1.20.0-1efcce676eae9bc3ea199fefb1904a84dcff97c32380c226a0a8a716f5b65855   "/bin/sh -c 'cd /usr…"   5 minutes ago       Up 4 minutes                                            dev-peer1.org1.example.com-main-1.20.0
a1a9c652ded9        dev-peer1.org2.example.com-main-1.20.0-7f85dd880611d5bbcf1085f43995770fb8719f22473208250b973a846c1b2ae7   "/bin/sh -c 'cd /usr…"   5 minutes ago       Up 5 minutes                                            dev-peer1.org2.example.com-main-1.20.0
6894c06e79ed        dev-peer0.org2.example.com-main-1.20.0-c0de3285825ab10de22b9004229d2c3895c54fd4454a6c2a76dcde2f38434e4a   "/bin/sh -c 'cd /usr…"   5 minutes ago       Up 5 minutes                                            dev-peer0.org2.example.com-main-1.20.0
1fe251a8a644        dev-peer0.org1.example.com-main-1.20.0-fee9991ccfdfe40eec71d579b4882d1840ac1f6bd2ded4555045359adb44928c   "/bin/sh -c 'cd /usr…"   8 minutes ago       Up 8 minutes                                            dev-peer0.org1.example.com-main-1.20.0
```

Как видно для каждого из пиров запустился свой контейнер с чейнкодом

