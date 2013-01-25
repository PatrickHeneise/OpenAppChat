
/**
 * Module dependencies.
 */

var express = require('express')
  , app = express()
  , routes = require('./routes')
  , ejs = require('ejs')
  , http = require('http')
  , path = require('path')
  , server = http.createServer(app);

server.listen(80);

var io = require('socket.io').listen(server)
  , connectCounter = 0;

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.engine('.html', require('ejs').__express);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

io.sockets.on('connection', function (socket) {
  socket.on('message', function(message) {
    io.sockets.volatile.send(message);
  });
  socket.on('connect', function() { 
    socket.broadcast.emit('clients', {clients: Object.keys(io.connected).length});
  });
  socket.on('disconnect', function() { 
    socket.broadcast.emit('clients', {clients: Object.keys(io.connected).length});
  });
  socket.on('howmanyclients', function() {
    socket.emit('clients', {clients: Object.keys(io.connected).length});
  });
});