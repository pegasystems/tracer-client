[![Build Status](https://travis-ci.org/pegasystems/tracer-client.svg?branch=master)](https://travis-ci.org/pegasystems/tracer-client)
[![codecov](https://codecov.io/gh/pegasystems/tracer-client/branch/master/graph/badge.svg)](https://codecov.io/gh/pegasystems/tracer-client)

# tracer-client

This is a javascript API for interacting with the Pega Tracer servlet API.



## Development Tasks
- After cloning the project use `npm install` to install all dependencies. See the following links to lean more
	- [webpack](https://webpack.github.io/)
	- [jasmine](https://jasmine.github.io/)
	- [jquery](http://jquery.com/)
	- [istanbul](https://github.com/istanbuljs)
- Build the project using `npm run build` which will run tests and generate build artifacts
- Run tests using `npm test`
- Launch a sample tracer viewer with a mock Events service using `npm run dev`

## Usage

##### For use in an active Pega requestor session
- Load the contents of *dist/index.bundle.js* into a Pega session in some way. I use Chrome Dev tools but it could be embedded in a Text rule.
- Create a tracer instance using `var tracer = new Tracer([ConnectionID], [NodeID])` where ConnectionID is equal to pxRequestor.pxClientConnection
- Start the tracer using `tracer.start()`
  - Be careful not to leave the headless tracer running in the background, as it will impact system performance, just like the normal tracer
- By default, tracer tasks will start to display in the browser console. Custom event handlers can be added using the 'registerEventCallback' function.

##### For use as a nodejs module
- Add the following require statement to your code `Tracer = require "/src/client"`
- Once this project is moved to GitHub I will consider pushing to npm

##### To view a sample tracer client
- Update `src/client.ts` as follows:
```
//this.eventsService = new EventsServicePega8(this.connectionID, this.nodeId);
this.eventsService = new EventsServiceFromFile();
```
- Run the command `npm run-script start-file-server`
- Run the command `npm run-script build`
- Launch the file `client-pega-servlet` in a browser

## Module Functions
- start
- stop
- registerEventCallback
- clear
- getEventHeader
