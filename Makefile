NOW := $(shell date +"%c" | tr ' :' '__')

install:
	cd _harp; npm install

server:
	cd _harp; gulp

production:
	cd _harp; NODE_ENV=production gulp

compile:
	NODE_ENV=production harp compile _harp ./
	cd _harp; gulp optimize

deploy:
	git add -A
	git commit -a -m "$(NOW)"
	git push -u origin master

test:
	# phantomjs ~/bin/yslow.js --info grade --format tap http://stephenway.net
	psi http://stephenway.net
	perfbudget --url http://stephenway.net --key A.32baa584cf7c0a9647fcd4a61fbf117d
