NOW := $(shell date +"%c" | tr ' :' '__')

install:
	cd _harp; npm install

server:
	cd _harp; gulp

production:
	cd _harp; NODE_ENV=production gulp

compile:
	NODE_ENV=production harp compile _harp ./

deploy:
	git add -A
	git commit -a -m "$(NOW)"
	git push -u origin master
