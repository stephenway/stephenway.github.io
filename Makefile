NOW := $(shell date +"%c" | tr ' :' '__')

compile:
	NODE_ENV=production harp compile _harp ./

deploy:
	git add -A
	git commit -a -m "$(NOW)"
	git push origin master
