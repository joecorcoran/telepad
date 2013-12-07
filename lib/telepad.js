var config = require('../config.json'),
    twilio = require('twilio')(config.twilio.sid, config.twilio.token);

var Telepad = function(launchpad, numbers) {
  this.launchpad = launchpad;
  this.numbers = numbers;
  this.calls = new Array(8);
  numbers.forEach(function(number, idx) {
    this.launchpad.getButton(8, idx).light(this.launchpad.colors.red.high);
  }, this);
};

Telepad.prototype.callNumber = function(idx) {
  var t      = this,
      number = t.numbers[idx];
  console.log('Calling', number);
  twilio.makeCall({
    to:   number,
    from: config.twilio.number,
    url:  config.ngrok.address + '/call'
  }, function(err, responseData) {
    t.launchpad.getButton(8, idx).light(t.launchpad.colors.green.high);
    t.calls[idx] = responseData.sid;
  });
};

Telepad.prototype.playSound = function(sound, idx) {
  var callSid = this.calls[idx];
  if (callSid) {
    console.log('Switching call', callSid, 'onto sound', sound);
    this.clearRow(idx);
    this.launchpad.getButton(sound, idx).light(this.launchpad.colors.orange.high);
    twilio.calls(callSid).update({
      url: config.ngrok.address + '/sounds/' + sound.toString()
    });
  }
};

Telepad.prototype.clearRow = function(idx) {
  for(var i = 0; i < 8; i++) {
    this.launchpad.getButton(i, idx).dark();
  }
};

exports.Telepad = Telepad;
