var argv = require('optimist')
            .default('c', './config.json')
            .alias('c', 'config')
            .describe('c', 'Config file')
            .argv;

var config  = require(argv.c),
    conn    = require('midi-launchpad').connect(config.midi.port),
    Telepad = require('./lib/telepad').Telepad,
    server  = require('./lib/server').server;


var telepad;

conn.on('ready', function(launchpad) {
  telepad = new Telepad(launchpad, config);
  server.set('config', config);
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
