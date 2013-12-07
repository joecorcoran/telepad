# Telepad

Built for [Music Hack Day London 2013][mhd].

Use a [Novation Launchpad][launchpad] and the [Twilio API][twilio_api] to play
looped sounds on up to eight phones.

## How?

You'll need a [Twilio][twilio] account, an [ngrok][ngrok] account, a list of up
to eight sound files hosted somewhere and a list of up to eight phone numbers.

Add a `config.json` file to this directory, as follows:

```json
{
  "ngrok": {
    "address": "http://abcabc.ngrok.com",
    "port": 9999
  },
  "twilio": {
    "sid": "abcabc",
    "token": "defdef"
  },
  "sounds": [
    "https://s3-us-west-2.amazonaws.com/telepad/mp3-128-cropped/Glockenspiel+A1.mp3",
    "https://s3-us-west-2.amazonaws.com/telepad/mp3-128-cropped/Glockenspiel+B1.mp3",
    "https://s3-us-west-2.amazonaws.com/telepad/mp3-128-cropped/Glockenspiel+D1.mp3",
    "https://s3-us-west-2.amazonaws.com/telepad/mp3-128-cropped/Glockenspiel+D2.mp3",
    "https://s3-us-west-2.amazonaws.com/telepad/mp3-128-cropped/Glockenspiel+E1.mp3",
    "https://s3-us-west-2.amazonaws.com/telepad/mp3-128-cropped/Glockenspiel+E2.mp3",
    "https://s3-us-west-2.amazonaws.com/telepad/mp3-128-cropped/Glockenspiel+F%231.mp3",
    "https://s3-us-west-2.amazonaws.com/telepad/mp3-128-cropped/Glockenspiel+F%232.mp3"
  ],
  "numbers": [
    "+440000000000",
    "+440000000000",
    "+440000000000"
  ]
}
```

With thanks to Syd Lawrence for [midi-launchpad][nml] and his helpful advice.

[mhd]: http://london.musichackday.org/2013
[launchpad]: http://global.novationmusic.com/midi-controllers-digital-dj/launchpad
[twilio_api]: https://www.twilio.com/docs
[twilio]: https://www.twilio.com
[ngrok]: https://ngrok.com/
[nml]: http://sydlawrence.github.io/node-midi-launchpad/
