var net = require('net');

module.exports = (new function Connection() {
	var socket = new net.Socket();

	socket.on('connect', function () {
		DEBUG('connected to remote server.');
		TCP.write('hs', 'ascii');
	});
	socket.on('data', function (data) {
		var cmd = data.slice(0, 2); data = data.slice(2);
		switch (cmd) {
			'pf': 
				Player.play(data);
				break;
			'sp':
				Player.stop();
				break;
			'fl':
				Player.list();
				break;
			'fd':
				data = data.split('\n');
				Player.download(data[0], data[1]);
				break;
		}
	});
	socket.on('end', function () {
		DEBUG('remote server unexpectedly closed connection.');
		DEBUG('connection attempt in ' + Options.reconnectTimeout + ' seconds.');
		setTimeout(function () {
			DEBUG('connecting...');
			socket.connect(Options.port, Options.ip);
		}, Options.reconnectTimeout * 1000);
	});
	socket.on('error', function (error) {
		ERROR(error);
		DEBUG('connection attempt in ' + Options.reconnectTimeout + ' seconds.');
		setTimeout(function () {
			DEBUG('connecting...');
			socket.connect(Options.port, Options.ip);
		}, Options.reconnectTimeout * 1000);
	});
	
	socket.setEncoding('ascii');
	socket.setNoDelay(true);

	this.start = function () {
		socket.connect(Options.port, Options.ip);
	}
	
	this.send = function (command, data) {
		if (data instanceof Array) {
			data = data.join('\n');
		}
		socket.write(command + (data || ''), 'ascii');
	}
});
