var config  = require('./config.json'),
    conn    = require('midi-launchpad').connect(0),
    Telepad = require('./lib/telepad').Telepad,
    server  = require('./lib/server').server;


var telepad;

conn.on('ready', function(launchpad) {
  telepad = new Telepad(launchpad, config.numbers);
  server.listen(config.ngrok.port);
  console.log('Hello');
  launchpad.on('press', function(button) {
    if (button.x === 8) {
      telepad.callNumber(button.y);
    } else {
      telepad.playSound(button.x, button.y);
    }
  });
});

process.on('SIGINT', function() {
  telepad.launchpad.clear();
  console.log('\nGoodbye');
  process.exit();
});
