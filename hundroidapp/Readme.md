# Overview

Tinytib.js was hatched as an idea to assist developers in automating a suite of in-browser tests, cycling through either web or file system based HTML page, and allowing a human observer to monitor results.  In our case, we had a problem we were trying to measure with browser performance on mobile devices.  We found that a variety of factors would affect performance.  To isolate variables, we wanted to take network out of the picture, and focus purely on render performance.  This gets into another realm of testing perceived performance, and part of this is figuring out at what point the page has loaded as far as the browser is concerned, and then the part where the actual page has rendered.

So Tinytib.js was born.  It stands for "Tiny Test In Browser".  Use it, extend it, and test test test!  This is a useful tool for a variety of application 

## Features

- Automates loading of web pages from a local or network source
- JSON based configuration
- In some browser environments, it's possible to generate log files
- server-less, in terms of the code doesn't need to be hosted on a server.
- Use it to test your browser performance, test a mobile version of a site, or simply automate "playing" web pages in a loop
- Runs on mobile devices, tested extensively on Android.
- Includes a firebug lite to support mobile device debugging

## Use

- Edit the provided config.js and add the sites you want.  If they are on the local filesystem, use file:/ + your fully qualified path.
- Configure any other settings you need.
- Make any modifications to index.html needed. I added an extra copy to keep as a reference version, called index.html.tpl.

## Limitations

- File based logging doesn't work everywhere, and depends on browser capabilities.  I had mixed results
- IFrames are used, and not everyone loves IFrames.  Sorry.  I could have used flash I guess?
- I haven't tested on iOS.  Please do so if you have time.
- I didn't have time to figure out the browser based module loading commonJS or browserify stuff.  I know it's simple, but I had something to deliver.
- File based logging was on the list of things to do, but due to HTML5 limitations, browser shims, my lack of experience with the filesystem code, and poor browser support, I put it aside.
- I'm using jquery.  If that makes me inpure, sorry!  Jquery helped, but probably could be refactored out.

## Future Ideas

- Skinnable CSS "chrome"
- Get a browser based module system working so this library can be loaded easily
- Fix the file logging to log performance output.
- Refactor out use of jquery
- Disable the visible iframe
- log output to screen for performance metrics
- Disable buttons that don't work
- Do capbility checking
- Add more configuration options for timeouts etc.
- Add more performance metrics
