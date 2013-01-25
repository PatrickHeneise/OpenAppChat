/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var socket = io.connect('http://openappchat.jit.su');
var saySomething = function saySomething(evt) {
	evt.preventDefault();
	var form_data = $('#saysomething').serializeArray();
  socket.send(form_data[0].value);
  document.getElementById('something').value = '';
};

socket.on('connect', function() {
	socket.on('clients', function(clients) {
		document.getElementById('clients').innerHTML = clients.clients;
	});
	socket.on('message', function (msg) {
      var chatbox = document.getElementById('chatbox')
	  , html = '';

		if(chatbox.innerHTML === 'No content yet. ):') {
			chatbox.innerHTML = '';
		}
		html = '<p>' + msg + '<p>';
	  chatbox.innerHTML += html;
	  chatbox.scrollTop = chatbox.scrollHeight;
  });
});

$(function () {
	document.getElementById('saysomething').addEventListener('submit', saySomething, false);
	socket.emit('howmanyclients', {});
});

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
