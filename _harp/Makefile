NOW := $(shell date +"%c" | tr ' :' '__')

compile:
	harp compile _harp ./

deploy:
	git add -A
	git commit -a -m "$(NOW)"
	git push origin master
