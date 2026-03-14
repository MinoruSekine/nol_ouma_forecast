all: lint test

lint:
	npm run lint

test:
	npm run test

.PHONY: all lint test
