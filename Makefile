.PHONY: help network bin chaincode tools cli
.DEFAULT_GOAL := help
LEDGER_NETWORK_MODE ?= solo
COMPOSE_FILE = ./network/$(LEDGER_NETWORK_MODE)/docker-compose.yml
COMPOSE = docker-compose -f $(COMPOSE_FILE)

-include Makefile.$(LEDGER_NETWORK_MODE)

test:
	@echo $(LEDGER_NETWORK_MODE)
	@echo $(COMPOSE_FILE)
	@echo $(COMPOSE)

docker_clean: ### Clean all docker containers, prune containers and unused networks
	docker kill $(shell docker ps -q) || true
	docker container prune -f
	docker network prune -f

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
