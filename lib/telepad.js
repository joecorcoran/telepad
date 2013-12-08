var twl = require('twilio');

var Telepad = function(launchpad, config) {
  this.twilio    = twl(config.twilio.sid, config.twilio.token);
  this.launchpad = launchpad;
  this.config    = config;
  this.numbers   = config.numbers;
  this.calls     = new Array(8);
  this.numbers.forEach(function(number, idx) {
    this.launchpad.getButton(8, idx).light(this.launchpad.colors.red.high);
  }, this);
};

Telepad.prototype.onPress = function(button) {
  if (button.x === 8) {
    this.calls[button.y] ? this.hangUp(button.y) : this.callNumber(button.y);
  } else {
    this.playSound(button.x, button.y);
  }
};

Telepad.prototype.hangUp = function(idx) {
  var t = this, callSid = this.calls[idx];
  this.twilio.calls(callSid).update({
    status: 'completed'
  }, function(err, call) {
    t.launchpad.getButton(8, idx).light(t.launchpad.colors.red.high);
  });
};

Telepad.prototype.callNumber = function(idx) {
  var t = this, number = this.numbers[idx];
  console.log('Calling', number);
  this.twilio.makeCall({
    to:   number,
    from: t.config.twilio.number,
    url:  t.config.ngrok.address + '/call'
  }, function(err, responseData) {
    t.launchpad.getButton(8, idx).light(t.launchpad.colors.green.high);
    t.calls[idx] = responseData.sid;
  });
};

Telepad.prototype.playSound = function(sound, idx) {
  var t = this, callSid = this.calls[idx];
  if (callSid) {
    console.log('Switching call', callSid, 'onto sound', sound);
    this.clearRow(idx);
    this.launchpad.getButton(sound, idx).light(this.launchpad.colors.orange.high);
    this.twilio.calls(callSid).update({
      url: t.config.ngrok.address + '/sounds/' + sound.toString()
    });
  }
};

Telepad.prototype.clearRow = function(idx) {
  for(var i = 0; i < 8; i++) {
    this.launchpad.getButton(i, idx).dark();
  }
};

exports.Telepad = Telepad;
