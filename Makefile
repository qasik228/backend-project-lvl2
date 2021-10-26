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