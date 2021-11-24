install:
	npm ci
gendiff:
	node bin/gendiff -h
publish:
	npm publish --dry-run
lint:
	npx eslint .
lintFix:
	npx eslint --fix .
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
test-cover:
	NODE_OPTIONS=--experimental-vm-modules npx jest -- --coverage --coverageProvider=v8