
// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define

define(function(require) {
    // Zepto provides nice js and DOM methods (very similar to jQuery,
    // and a lot smaller):
    // http://zeptojs.com/
    var $ = require('zepto');

    // Need to verify receipts? This library is included by default.
    // https://github.com/mozilla/receiptverifier
    require('receiptverifier');

    // Want to install the app locally? This library hooks up the
    // installation button. See <button class="install-btn"> in
    // index.html
    require('./install-button');

    // Write your app here.
    var socket = io.connect('http://openappchat.jit.su:80');
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

});
