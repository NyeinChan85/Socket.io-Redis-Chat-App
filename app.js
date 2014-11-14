var express = require('express');
	app   	= express(),
	http	= require('http');
	server 	= http.createServer(app);
	io 		= require('socket.io').listen(server);
	redis   = require('redis');
	r_client= redis.createClient();
	

	storeMessage = function(name, data){
		var s_message = JSON.stringify({ name: name, data: data});
		r_client.lpush("server messages", s_message, function (err, response){
			r_client.ltrim("server messages", 0 , 9);
		})
		
	}

app.get('/', function(request, response){
	response.sendfile(__dirname + '/public/index.html');
});  
app.use(express.static(__dirname + '/public'));


io.sockets.on('connection', function(client){
	client.on('join', function(name){
		r_client.lrange("server messages", 0, -1, function (err, messages){
			messages = messages.reverse();
			messages.forEach(function(message){
				message = JSON.parse(message);
				client.emit('server messages', message.name + ':' + message.data);
			});
		
		});
	
		client.nickname = name;
	});

	client.on('client messages', function(data){
		var nickname = client.nickname;

		//io.sockets.broadcast.emit('server messages', nickname + " : " + data);
		io.sockets.emit('server messages', nickname + " : " + data);
		storeMessage(nickname, data);
	});
});

server.listen(8000);
console.log("app is listening to port 8000");