var server = require('express')();

server.post('/call', function(req, res) {
  res.send(
    '<?xml version="1.0" encoding="UTF-8"?><Response><Say loop="0">Waiting</Say></Response>'
  );
});

server.post('/sounds/:idx', function(req, res) {
  var sound = server.get('config').sounds[req.params['idx']];
  res.send(
    '<?xml version="1.0" encoding="UTF-8"?><Response><Play loop="0">' + sound + '</Play></Response>'
  );
});

exports.server = server;
