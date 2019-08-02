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
## Angular-Pega

After pulling the project, run the following command into Angular project directory
```
//Generates the necessary artifacts, the --prod tag only generates the three necessary files to be used in Pega
ng build --prod
```
The three files will be generated in the dist subfolder of the Angular project. There will be three files titled "main", "polyfill"
"runtime", use the ECMAScript 5 version of the files instead of the 2015 version of the files. There will be an additional css file generated with the three relevant generated files. 

Login into Dev Studio lu-84 system and add the NG-Tracer branch. 

In the "Text File" section of the NG-Tracer branch, there are 4 files titled with the prefix "webwb pztracer-ng". Copy and paste the contents of the ECMAScript 5 version of files generated into their correct text file in the branch. 

  To save the changes to the content of a text file, click the the blue "Check out" button in the top right corner and to save the
  changes made, clicke the blue "Save" button that has replaced the "Check out" button. Then click the gray "Check in" button
  to make the changes visible to everyone else with access to the branch. 

In the "Section" tab of the NG-Tracer branch, click the tab called "pzTracerViwerSessionConfig". In the HTML Source textbox, paste this HTML script into the textbox.
```
  <script>
    localStorage.connectionId = "<pega:reference mode="normal" name="pxRequestor.pxClientConnection"/>";
      localStorage.nodeId = "<pega:reference mode="normal" name="pxProcess.pxSystemNodeID"/>";
  </script>
  <pega:static type="script" app="webwb" >
	  <pega:bundle name="pztracer-ng" />
  </pega:static>
```

Checkout and save and then checkin the changes the same way the text files were altered. 

In the bottom tab of the page where the "Tracer" button normally is, there will be a new button titled "NG Tracer" right next to it, click it and it will emulate how the original tracer works. 

This is roughly how the sub projects are structured
![Project structure](https://user-images.githubusercontent.com/83574/59567501-b88a0000-903c-11e9-98b7-df1dbd4a65c6.png "Project structure")



## tracer-client
The tracer client project provides 

[README](https://github.com/pegasystems/tracer-client/tree/master/tracer-client)

## dev-tools 
Development tools to facilitate Tracer development, specifically without
a running Pega application server.

[README](https://github.com/pegasystems/tracer-client/tree/master/tracer-client)
