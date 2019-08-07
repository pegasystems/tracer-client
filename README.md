[![Build Status](https://travis-ci.org/pegasystems/tracer-client.svg?branch=master)](https://travis-ci.org/pegasystems/tracer-client)
[![codecov](https://codecov.io/gh/pegasystems/tracer-client/branch/master/graph/badge.svg)](https://codecov.io/gh/pegasystems/tracer-client)

# Tracer

This repository now contains multiple sub-projects which support a modern 
web experience for the Tracer rule profiling tool.

Each project has it's own readme to provide additional information and
command line utilities.

This project uses [lerna](https://lerna.js.org/) to manage multiple sub projects. To install and build
all subprojects run the following commands

```
// Install lerna
npm install 

// Download dependencies for all projects
npm install-all

// Build all child projects
npm build-all
```


## Project-Structure
This is roughly how the sub projects are structured
![Project structure](https://user-images.githubusercontent.com/83574/59567501-b88a0000-903c-11e9-98b7-df1dbd4a65c6.png "Project structure")



## tracer-client
The tracer client project provides 

[README](https://github.com/pegasystems/tracer-client/tree/master/tracer-client)

## tracer-view-classic
The classic tracer UI built using the tracer client interface.

[README](https://github.com/pegasystems/tracer-client/tree/master/tracer-view-classic)

## dev-tools 
Development tools to facilitate Tracer development, specifically without
a running Pega application server.

[README](https://github.com/pegasystems/tracer-client/tree/master/tracer-client)
