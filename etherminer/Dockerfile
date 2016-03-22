FROM ubuntu:14.04.2
MAINTAINER Team P2P Blockchain 

### Copied from https://github.com/ethereum/ethereum-dockers/blob/master/go-ethereum-base/Dockerfile

# Export GOPATH
ENV GOPATH /root/go
ENV PATH /root/go/bin:$PATH

# GOPATH
RUN mkdir -p /root/go

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update
RUN apt-get upgrade -y

RUN apt-get install -qy git mercurial software-properties-common
RUN apt-get install -qy libgmp3-dev libreadline6-dev
RUN apt-get install -qy build-essential

# golang
RUN add-apt-repository ppa:ethereum/ethereum
RUN apt-get update
RUN apt-get install -qy geth
RUN apt-get install -qy solc

### Additions

RUN mkdir /home/geth

# add custom genesis file
ADD genesisFile.json /home/geth/genesisFile.json

# add passwordfile
ADD account.pass /home/geth/account.pass

# create account
RUN geth --datadir=/home/geth/ --password /home/geth/account.pass account new

# expose ports
EXPOSE 8545
EXPOSE 4000

# Run geth
CMD geth --rpc --rpcport "8545" --rpcaddr "0.0.0.0" --rpccorsdomain --networkid 6421 --maxpeers=0 --nodiscover --datadir=/home/geth/ --mine --minerthreads 1 --genesis /home/geth/genesisFile.json --password /home/geth/account.pass --unlock=0 --gasprice "500" --rpcapi "db,eth,net,web3,personal" -gpomin "500" --gpomax "50000" console
