
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);

var nameToSocket = {};
var waiter = "";

io.sockets.on('connection', function(socket)) {

	socket.on('addUser', function(userName) {
		if (nameTaken(userName)) {  // username already exists
			socket.emit('nameTaken', userName);
		} else {
			nameToSocket.userName = socket; // add name and socket to map
			if (waiter === "") {
				waiter = userName;
			} else {
				var person1 = waiter;
				var person2 = username;
				waiter = "";  

				var socket1 = nameToSocket.person1;
				var socket2 = nameToSocket.person2;

				socket1.emit('matched', person2);
				socket2.emit('matched', person1);
			}
		}
	});

	socket.on('sendMessage', function(user, data) {
		var userSocket = nameToSocket.user;

		userSocket.emit('newMessage', data);
	});

	function nameTaken(name) {
		if (nameToSocket.name === null) {
			return false;
		} else {
			return true;
		}
	}

//	socket.on('disconnect', function(userName) {
//
//	});
}

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
