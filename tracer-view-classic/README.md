# Tracer View Classic

Tracer view classic is a UI for the tracer using the tracer-client interface which tries to demonstrate all of the existing features of the tracer in a very familiar interface.

As this project begins to diverge from the existing tracer we'll likely rename it.

## Local development
This project comes bundled with a sample trace output file so you can start development without a Pega environemnt.
To do so, execute the following commants
```
// after cloning the repository

npm install
npm run install-all
npm start-trace-file-server
cd tracer-view-classic
ng serve

// navigate to localhost:4200
```

## Using this project in a Pega environment

There is a branch we have been using that allows us to load the project output into the Dev Studio. 

This branch is not yet available for distribution but for posterity, or if some one would like to replicate it,
 the branch 
has the following structure:
  - *Harness*: pzTracerViewer
    - *Text File*: pztracer-ng-styles.css
    - *Section*: pzTracerViewer
      - *Section*: pzTracerViewerSessionConfig
        - Text file: pztracer-ng-main-es5.js
        - Text File: pztracer-ng-pollyfills-es5.js
        - Text file: pztracer-ng-runtime-es5.js
      - *Section*: pzTracerViewerMain

*Note: It is important that the session config code executes before the compiled angular text files.*

#### pzTracerViewerMain
```
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" type="image/x-icon" href="favicon.ico">
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<app-root></app-root>
```


#### pzTracerVeiwerSessionConfig
```
<script>
  localStorage.connectionId = "<pega:reference mode="normal" name="pxRequestor.pxClientConnection"/>";
    localStorage.nodeId = "<pega:reference mode="normal" name="pxProcess.pxSystemNodeID"/>";
</script>
<pega:static type="script" app="webwb" >
	<pega:bundle name="pztracer-ng" />
</pega:static>
```


## Updating the NG-Tracer branch with the latest build from source
Run the following command in the tracer-view-classic sub-project. 
```
ng build --prod
```
The compiled angular application will be generated in the project's `dist` folder. There should be three 
javascript files titled `main`, `polyfill` and `runtime`; use the ECMAScript 5 version of the files 
instead of the 2015 version of the files. There will be an additional css file generated in the same 
directory. 

Copy the contents of these four generated files into the text file rules within the Dev Studio with the 
corresponding names.
