install:
	npm ci
gendiff:
	node bin/gendiff -h
publish:
	npm publish --dry-run