var _startTime = Date.now();

global.DEBUG = function (info) { if (OPTIONS.verbose) console.log('>> [' (Date.now() - _startTime) + ']: ' + info); };
global.ERROR = function (error) { console.log('>>> ' + error.code + ':\n', error.stack); };

global.Options = require('./config.json');
global.Connection = require('./connection.js');
global.Player = require('./player.js');

Connection.start();
Player.start();

DEBUG('up and running.');
