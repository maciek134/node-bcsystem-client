var fs = require('fs'),
	http = require('http'),
	url = require('url');

module.exports = (new function Player() {
	this.play = function (name) {
		
	};
	this.stop = function () {
		
	};
	this.list = function (name) {
		fs.readdir(Options.musicDir, function (error, files) {
			Connection.send('fl', files));
		});
	};
	this.download = function (name, url) {
		http.get(url, function (res) {
			res.on('data', function (data) {
				fs.appendFile(Options.musicDir + '/' + name, data);
			});
			res.on('end', function () {
				Connection.send('fc', name);
			});
		});
	};
});
