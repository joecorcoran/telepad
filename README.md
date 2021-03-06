# Telepad

Built for [Music Hack Day London 2013][mhd].

Use a [Novation Launchpad][launchpad] and the [Twilio API][twilio_api] to play
looped sounds on up to eight phones.

[Demo video!](https://vimeo.com/81316344)

## How?

You'll need a [Twilio][twilio] account, an [ngrok][ngrok] account, a list of up
to eight sound files hosted somewhere and a list of up to eight phone numbers.

```
$ npm install telepad
```

This adds a binary named `telepad` to `./node_modules/.bin`, which should be in your `$PATH`.

Run ngrok on a port of your choice:

```
$ ngrok 9999
```

ngrok will assign you an address. Now you need a JSON config file as follows:

```json
{
  "midi": {
    "port": 0
  },
  "ngrok": {
    "address": "http://abcabc.ngrok.com",
    "port": 9999
  },
  "twilio": {
    "sid": "abcabc",
    "token": "defdef",
    "number": "+440000000000"
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
    "+440000000000",
    "+440000000000",
    "+440000000000",
    "+440000000000",
    "+440000000000",
    "+440000000000"
  ]
}
```

Then start the Telepad server:

```
$ telepad
```

The config file is expected to be named `config.json` and located in the
current working directory. If it's not, you can pass in a relative path.

```
$ telepad some/other/file.json
```

The special buttons on the right of the Launchpad will light up red for each
phone number in your config. Press them to make a call, you'll see them turn
green.

Each row corresponds to a phone and each button corresponds to a
sound from your config! Pressing the special buttons again will hang up the
calls.

With thanks to Syd Lawrence for [midi-launchpad][nml] and his helpful advice.

## License

Copyright (c) 2013 Joe Corcoran

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

[mhd]: http://london.musichackday.org/2013
[launchpad]: http://global.novationmusic.com/midi-controllers-digital-dj/launchpad
[twilio_api]: https://www.twilio.com/docs
[twilio]: https://www.twilio.com
[ngrok]: https://ngrok.com/
[nml]: http://sydlawrence.github.io/node-midi-launchpad/
