install:
	npm ci
	npm link

lint:
	npx eslint .

lint-fix:
	nmp eslint . --fix

test:
	npx jest

test-coverage:
	npx jest --coverage
	
check: 
	make lint
	make test

.PHONY: install lint lint-fix test test-coverage check