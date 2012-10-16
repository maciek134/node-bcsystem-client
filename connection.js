var net = require('net');

module.exports = (new function Connection() {
	var socket = new net.Socket();

	socket.on('connection', function () {
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
			'fc':
				Player.check(data);
				break;
			'fd':
				Player.download(data);
				break;
		}
	});
	socket.on('end', function () {
		DEBUG('remote server unexpectedly closed connection.');
		DEBUG('connection attempt in ' + OPTIONS.reconnectTimeout + ' seconds.');
	});
	socket.on('error', ERROR);
	
	socket.setEncoding('ascii');
	socket.setNoDelay(true);

	this.start = function () {
		socket.connect(Options.port, Options.ip);
	}
	
	this.send = function (command, data) {
		socket.write(command + (data || ''), 'ascii');
	}
});
