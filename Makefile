install:
	npm ci
gendiff:
	node bin/gendiff -h
publish:
	npm publish --dry-run
	npm link
lint:
	npx eslint .
lintFix:
	npx eslint --fix .
test:
	npx jest
test-cover:
	npx jest --coverage