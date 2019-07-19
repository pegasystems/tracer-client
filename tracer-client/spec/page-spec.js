const {Page} = require('./build/page');
//import * as Parser from "xml2js";
let Parser = require("xml2js");


let xml = "<tracelog><traceEvent><primarypageContent><pagedata><pxObjClass>tenzin</pxObjClass></pagedata></primarypageContent></traceEvent></tracelog>"
let xml3 = "<pagedata>\n" +
    "<pyStartPage>Work</pyStartPage>\n" +
    "<pyActiveWorkGroup>Default</pyActiveWorkGroup>\n" +
    "<pyPortalSummary>Summary for Last 7 Days for Default WorkGroup</pyPortalSummary>\n" +
    "<pyRefreshInterval>180</pyRefreshInterval>\n" +
    "<pxCreateDateTime>20190604T013617.111 GMT</pxCreateDateTime>\n" +
    "<pyCurrentPage>Work</pyCurrentPage>\n" +
    "<pyActiveWorkGroupLabel>Default WorkGroup</pyActiveWorkGroupLabel>\n" +
    "<pyReportingDateTimeInterval>20190528T040000.000 GMT</pyReportingDateTimeInterval>\n" +
    "<pyAppExplorerWorkPool>OPEE0U-FeenrApp-Work</pyAppExplorerWorkPool>\n" +
    "<pyOverridePreferences>false</pyOverridePreferences>\n" +
    "<pyUrgentWorkHeader>Urgent work for 'Default WorkGroup'</pyUrgentWorkHeader>\n" +
    "<pyTopPerformers>Top Performers for Last 7 Days from Default WorkGroup</pyTopPerformers>\n" +
    "<pxObjClass>Data-Portal-DesignerStudio</pxObjClass>\n" +
    "<pyWelcomeHTML>WelcomeScreen</pyWelcomeHTML>\n" +
    "<pxCreateOperator>feenr</pxCreateOperator>\n" +
    "<pyReportingTimeInterval>Last 7 Days</pyReportingTimeInterval>\n" +
    "<pxCreateSystemID>pega</pxCreateSystemID>\n" +
    "<pyLabel>FeenrApp</pyLabel>\n" +
    "<pyPDNQueryURI>https://pdn.pega.com/products/pega-815</pyPDNQueryURI>\n" +
    "<pxCreateOpName>Ryan Feeney</pxCreateOpName>\n" +
    "<pzStatus>valid</pzStatus>\n" +
    "<pyFilterGadget>\n" +
    "<pxObjClass>PegaGadget-Filter</pxObjClass>\n" +
    "<pyActiveApplicationFiltersString>FeenrApp,PicadaAp,BranchApp,UIKit,PegaDeploymentManager,PegaDevOpsFoundation,PegaDevelopment,PegaSSOT,PegaNexusRepositoryConnector_20190422T165622140,PegaRULES</pyActiveApplicationFiltersString>\n" +
    "<pyNumberOfActiveAppFilters>10</pyNumberOfActiveAppFilters>\n" +
    "<pyAppContextInfoReference>pyDisplayHarness.pyFilterGadget.pyAppContextInfo</pyAppContextInfoReference>\n" +
    "<pyAppVersionConcatQuoted>\"FeenrApp:01.01.01\",\"PicadaAp:01.01.01\",\"BranchApp:01.01\",\"UIKit:12.01\",\"PegaDeploymentManager:4.5\",\"PegaDevOpsFoundation:4\",\"PegaDevelopment:07.01\",\"PegaSSOT:01.01\",\"PegaNexusRepositoryConnector_20190422T165622140:01.01.01\",\"PegaRULES:8\"</pyAppVersionConcatQuoted>\n" +
    "<pyEnteringSearchTerm>false</pyEnteringSearchTerm>\n" +
    "<pyUsedInApplicationExplorer>true</pyUsedInApplicationExplorer>\n" +
    "<pyApplicationFilterChoices REPEATINGTYPE=\"PageList\">\n" +
    "<rowdata REPEATINGINDEX=\"1\">\n" +
    "<pxObjClass>Embed-FilterGadget-Filter</pxObjClass>\n" +
    "<pyFilterName>FeenrApp</pyFilterName>\n" +
    "<pyFilterActive>true</pyFilterActive>\n" +
    "<pyFilterProductName>FeenrApp</pyFilterProductName>\n" +
    "<pxListSubscript>1</pxListSubscript>\n" +
    "<pyFilterInsName>FEENRAPP!01.01.01</pyFilterInsName>\n" +
    "<pyFilterType>Application</pyFilterType>\n" +
    "<pyFilterVersion>01.01.01</pyFilterVersion>\n" +
    "</rowdata>\n" +
    "<rowdata REPEATINGINDEX=\"2\">\n" +
    "<pxObjClass>Embed-FilterGadget-Filter</pxObjClass>\n" +
    "<pyFilterName>PicadaAppDev</pyFilterName>\n" +
    "<pyFilterActive>true</pyFilterActive>\n" +
    "<pyFilterProductName>PicadaAp</pyFilterProductName>\n" +
    "<pxListSubscript>2</pxListSubscript>\n" +
    "<pyFilterInsName>PICADAAP!01.01.01</pyFilterInsName>\n" +
    "<pyFilterType>Application</pyFilterType>\n" +
    "<pyFilterVersion>01.01.01</pyFilterVersion>\n" +
    "</rowdata>\n" +
    "<rowdata REPEATINGINDEX=\"3\">\n" +
    "<pxObjClass>Embed-FilterGadget-Filter</pxObjClass>\n" +
    "<pyFilterName>Branch merging</pyFilterName>\n" +
    "<pyFilterActive>true</pyFilterActive>\n" +
    "<pyFilterProductName>BranchApp</pyFilterProductName>\n" +
    "<pxListSubscript>3</pxListSubscript>\n" +
    "<pyFilterInsName>BRANCHAPP!01.01</pyFilterInsName>\n" +
    "<pyFilterType>Application</pyFilterType>\n" +
    "<pyFilterVersion>01.01</pyFilterVersion>\n" +
    "</rowdata>\n" +
    "<rowdata REPEATINGINDEX=\"4\">\n" +
    "<pxObjClass>Embed-FilterGadget-Filter</pxObjClass>\n" +
    "<pyFilterName>UI Kit</pyFilterName>\n" +
    "<pyFilterActive>true</pyFilterActive>\n" +
    "<pyFilterProductName>UIKit</pyFilterProductName>\n" +
    "<pxListSubscript>4</pxListSubscript>\n" +
    "<pyFilterInsName>UIKIT!12.01</pyFilterInsName>\n" +
    "<pyFilterType>Application</pyFilterType>\n" +
    "<pyFilterVersion>12.01</pyFilterVersion>\n" +
    "</rowdata>\n" +
    "<rowdata REPEATINGINDEX=\"5\">\n" +
    "<pxObjClass>Embed-FilterGadget-Filter</pxObjClass>\n" +
    "<pyFilterName>Pega Deployment Manager</pyFilterName>\n" +
    "<pyFilterActive>true</pyFilterActive>\n" +
    "<pyFilterProductName>PegaDeploymentManager</pyFilterProductName>\n" +
    "<pxListSubscript>5</pxListSubscript>\n" +
    "<pyFilterInsName>PEGADEPLOYMENTMANAGER!4.5</pyFilterInsName>\n" +
    "<pyFilterType>Application</pyFilterType>\n" +
    "<pyFilterVersion>4.5</pyFilterVersion>\n" +
    "</rowdata>\n" +
    "<rowdata REPEATINGINDEX=\"6\">\n" +
    "<pxObjClass>Embed-FilterGadget-Filter</pxObjClass>\n" +
    "<pyFilterName>Pega DevOps Foundation</pyFilterName>\n" +
    "<pyFilterActive>true</pyFilterActive>\n" +
    "<pyFilterProductName>PegaDevOpsFoundation</pyFilterProductName>\n" +
    "<pxListSubscript>6</pxListSubscript>\n" +
    "<pyFilterInsName>PEGADEVOPSFOUNDATION!4</pyFilterInsName>\n" +
    "<pyFilterType>Application</pyFilterType>\n" +
    "<pyFilterVersion>4</pyFilterVersion>\n" +
    "</rowdata>\n" +
    "<rowdata REPEATINGINDEX=\"7\">\n" +
    "<pxObjClass>Embed-FilterGadget-Filter</pxObjClass>\n" +
    "<pyFilterName>Pega Developer</pyFilterName>\n" +
    "<pyFilterActive>true</pyFilterActive>\n" +
    "<pyFilterProductName>PegaDevelopment</pyFilterProductName>\n" +
    "<pxListSubscript>7</pxListSubscript>\n" +
    "<pyFilterInsName>PEGADEVELOPMENT!07.01</pyFilterInsName>\n" +
    "<pyFilterType>Application</pyFilterType>\n" +
    "<pyFilterVersion>07.01</pyFilterVersion>\n" +
    "</rowdata>\n" +
    "<rowdata REPEATINGINDEX=\"8\">\n" +
    "<pxObjClass>Embed-FilterGadget-Filter</pxObjClass>\n" +
    "<pyFilterName>PegaSSOT</pyFilterName>\n" +
    "<pyFilterActive>true</pyFilterActive>\n" +
    "<pyFilterProductName>PegaSSOT</pyFilterProductName>\n" +
    "<pxListSubscript>8</pxListSubscript>\n" +
    "<pyFilterInsName>PEGASSOT!01.01</pyFilterInsName>\n" +
    "<pyFilterType>Application</pyFilterType>\n" +
    "<pyFilterVersion>01.01</pyFilterVersion>\n" +
    "</rowdata>\n" +
    "<rowdata REPEATINGINDEX=\"9\">\n" +
    "<pxObjClass>Embed-FilterGadget-Filter</pxObjClass>\n" +
    "<pyFilterName>Pega Nexus Repository connector</pyFilterName>\n" +
    "<pyFilterActive>true</pyFilterActive>\n" +
    "<pyFilterProductName>PegaNexusRepositoryConnector_20190422T165622140</pyFilterProductName>\n" +
    "<pxListSubscript>9</pxListSubscript>\n" +
    "<pyFilterInsName>PEGANEXUSREPOSITORYCONNECTOR_20190422T165622140!01.01.01</pyFilterInsName>\n" +
    "<pyFilterType>Application</pyFilterType>\n" +
    "<pyFilterVersion>01.01.01</pyFilterVersion>\n" +
    "</rowdata>\n" +
    "<rowdata REPEATINGINDEX=\"10\">\n" +
    "<pxObjClass>Embed-FilterGadget-Filter</pxObjClass>\n" +
    "<pyFilterName>Pega Platform</pyFilterName>\n" +
    "<pyFilterActive>true</pyFilterActive>\n" +
    "<pyFilterProductName>PegaRULES</pyFilterProductName>\n" +
    "<pxListSubscript>10</pxListSubscript>\n" +
    "<pyFilterInsName>PEGARULES!8</pyFilterInsName>\n" +
    "<pyFilterType>Application</pyFilterType>\n" +
    "<pyFilterVersion>8</pyFilterVersion>\n" +
    "</rowdata>\n" +
    "</pyApplicationFilterChoices>\n" +
    "<pyAppContextInfo>\n" +
    "<pxObjClass>Embed-AppContextInfo</pxObjClass>\n" +
    "<pyApplicationContextMode>AppAll</pyApplicationContextMode>\n" +
    "<pyFilterOnApplicationContext>true</pyFilterOnApplicationContext>\n" +
    "<pyApplicationList>FeenrApp,PicadaAp,BranchApp,UIKit,PegaDeploymentManager,PegaDevOpsFoundation,PegaDevelopment,PegaSSOT,PegaNexusRepositoryConnector_20190422T165622140,PegaRULES</pyApplicationList>\n" +
    "</pyAppContextInfo>\n" +
    "<pyApplicationFilterChoicesCopy REPEATINGTYPE=\"PageList\">\n" +
    "<rowdata REPEATINGINDEX=\"1\">\n" +
    "<pxObjClass>Embed-FilterGadget-Filter</pxObjClass>\n" +
    "<pyFilterName>FeenrApp</pyFilterName>\n" +
    "<pyFilterActive>true</pyFilterActive>\n" +
    "<pyFilterProductName>FeenrApp</pyFilterProductName>\n" +
    "<pxListSubscript>1</pxListSubscript>\n" +
    "<pyFilterInsName>FEENRAPP!01.01.01</pyFilterInsName>\n" +
    "<pyFilterType>Application</pyFilterType>\n" +
    "<pyFilterVersion>01.01.01</pyFilterVersion>\n" +
    "</rowdata>\n" +
    "<rowdata REPEATINGINDEX=\"2\">\n" +
    "<pxObjClass>Embed-FilterGadget-Filter</pxObjClass>\n" +
    "<pyFilterName>PicadaAppDev</pyFilterName>\n" +
    "<pyFilterActive>true</pyFilterActive>\n" +
    "<pyFilterProductName>PicadaAp</pyFilterProductName>\n" +
    "<pxListSubscript>2</pxListSubscript>\n" +
    "<pyFilterInsName>PICADAAP!01.01.01</pyFilterInsName>\n" +
    "<pyFilterType>Application</pyFilterType>\n" +
    "<pyFilterVersion>01.01.01</pyFilterVersion>\n" +
    "</rowdata>\n" +
    "<rowdata REPEATINGINDEX=\"3\">\n" +
    "<pxObjClass>Embed-FilterGadget-Filter</pxObjClass>\n" +
    "<pyFilterName>Branch merging</pyFilterName>\n" +
    "<pyFilterActive>true</pyFilterActive>\n" +
    "<pyFilterProductName>BranchApp</pyFilterProductName>\n" +
    "<pxListSubscript>3</pxListSubscript>\n" +
    "<pyFilterInsName>BRANCHAPP!01.01</pyFilterInsName>\n" +
    "<pyFilterType>Application</pyFilterType>\n" +
    "<pyFilterVersion>01.01</pyFilterVersion>\n" +
    "</rowdata>\n" +
    "<rowdata REPEATINGINDEX=\"4\">\n" +
    "<pxObjClass>Embed-FilterGadget-Filter</pxObjClass>\n" +
    "<pyFilterName>UI Kit</pyFilterName>\n" +
    "<pyFilterActive>true</pyFilterActive>\n" +
    "<pyFilterProductName>UIKit</pyFilterProductName>\n" +
    "<pxListSubscript>4</pxListSubscript>\n" +
    "<pyFilterInsName>UIKIT!12.01</pyFilterInsName>\n" +
    "<pyFilterType>Application</pyFilterType>\n" +
    "<pyFilterVersion>12.01</pyFilterVersion>\n" +
    "</rowdata>\n" +
    "<rowdata REPEATINGINDEX=\"5\">\n" +
    "<pxObjClass>Embed-FilterGadget-Filter</pxObjClass>\n" +
    "<pyFilterName>Pega Deployment Manager</pyFilterName>\n" +
    "<pyFilterActive>true</pyFilterActive>\n" +
    "<pyFilterProductName>PegaDeploymentManager</pyFilterProductName>\n" +
    "<pxListSubscript>5</pxListSubscript>\n" +
    "<pyFilterInsName>PEGADEPLOYMENTMANAGER!4.5</pyFilterInsName>\n" +
    "<pyFilterType>Application</pyFilterType>\n" +
    "<pyFilterVersion>4.5</pyFilterVersion>\n" +
    "</rowdata>\n" +
    "<rowdata REPEATINGINDEX=\"6\">\n" +
    "<pxObjClass>Embed-FilterGadget-Filter</pxObjClass>\n" +
    "<pyFilterName>Pega DevOps Foundation</pyFilterName>\n" +
    "<pyFilterActive>true</pyFilterActive>\n" +
    "<pyFilterProductName>PegaDevOpsFoundation</pyFilterProductName>\n" +
    "<pxListSubscript>6</pxListSubscript>\n" +
    "<pyFilterInsName>PEGADEVOPSFOUNDATION!4</pyFilterInsName>\n" +
    "<pyFilterType>Application</pyFilterType>\n" +
    "<pyFilterVersion>4</pyFilterVersion>\n" +
    "</rowdata>\n" +
    "<rowdata REPEATINGINDEX=\"7\">\n" +
    "<pxObjClass>Embed-FilterGadget-Filter</pxObjClass>\n" +
    "<pyFilterName>Pega Developer</pyFilterName>\n" +
    "<pyFilterActive>true</pyFilterActive>\n" +
    "<pyFilterProductName>PegaDevelopment</pyFilterProductName>\n" +
    "<pxListSubscript>7</pxListSubscript>\n" +
    "<pyFilterInsName>PEGADEVELOPMENT!07.01</pyFilterInsName>\n" +
    "<pyFilterType>Application</pyFilterType>\n" +
    "<pyFilterVersion>07.01</pyFilterVersion>\n" +
    "</rowdata>\n" +
    "<rowdata REPEATINGINDEX=\"8\">\n" +
    "<pxObjClass>Embed-FilterGadget-Filter</pxObjClass>\n" +
    "<pyFilterName>PegaSSOT</pyFilterName>\n" +
    "<pyFilterActive>true</pyFilterActive>\n" +
    "<pyFilterProductName>PegaSSOT</pyFilterProductName>\n" +
    "<pxListSubscript>8</pxListSubscript>\n" +
    "<pyFilterInsName>PEGASSOT!01.01</pyFilterInsName>\n" +
    "<pyFilterType>Application</pyFilterType>\n" +
    "<pyFilterVersion>01.01</pyFilterVersion>\n" +
    "</rowdata>\n" +
    "<rowdata REPEATINGINDEX=\"9\">\n" +
    "<pxObjClass>Embed-FilterGadget-Filter</pxObjClass>\n" +
    "<pyFilterName>Pega Nexus Repository connector</pyFilterName>\n" +
    "<pyFilterActive>true</pyFilterActive>\n" +
    "<pyFilterProductName>PegaNexusRepositoryConnector_20190422T165622140</pyFilterProductName>\n" +
    "<pxListSubscript>9</pxListSubscript>\n" +
    "<pyFilterInsName>PEGANEXUSREPOSITORYCONNECTOR_20190422T165622140!01.01.01</pyFilterInsName>\n" +
    "<pyFilterType>Application</pyFilterType>\n" +
    "<pyFilterVersion>01.01.01</pyFilterVersion>\n" +
    "</rowdata>\n" +
    "<rowdata REPEATINGINDEX=\"10\">\n" +
    "<pxObjClass>Embed-FilterGadget-Filter</pxObjClass>\n" +
    "<pyFilterName>Pega Platform</pyFilterName>\n" +
    "<pyFilterActive>true</pyFilterActive>\n" +
    "<pyFilterProductName>PegaRULES</pyFilterProductName>\n" +
    "<pxListSubscript>10</pxListSubscript>\n" +
    "<pyFilterInsName>PEGARULES!8</pyFilterInsName>\n" +
    "<pyFilterType>Application</pyFilterType>\n" +
    "<pyFilterVersion>8</pyFilterVersion>\n" +
    "</rowdata>\n" +
    "</pyApplicationFilterChoicesCopy>\n" +
    "</pyFilterGadget>\n" +
    "<pyPDNGadget>\n" +
    "<pxObjClass>PegaGadget-PDN</pxObjClass>\n" +
    "</pyPDNGadget>\n" +
    "<pyPortalPages REPEATINGTYPE=\"PageList\">\n" +
    "<rowdata REPEATINGINDEX=\"1\">\n" +
    "<pxObjClass>Embed-Pega-PortalPage</pxObjClass>\n" +
    "<pyCaption>Work</pyCaption>\n" +
    "<pyColumn REPEATINGTYPE=\"PageList\">\n" +
    "<rowdata REPEATINGINDEX=\"1\">\n" +
    "<pxObjClass>Embed-Pega-PortalColumn</pxObjClass>\n" +
    "<pyType>NARROW</pyType>\n" +
    "<pyUseGadgets REPEATINGTYPE=\"PageList\">\n" +
    "<rowdata REPEATINGINDEX=\"1\">\n" +
    "<pxObjClass>Embed-Pega-PortalGadget</pxObjClass>\n" +
    "<pyGadgetName>Tools</pyGadgetName>\n" +
    "<pyGadgetCaption>Tools</pyGadgetCaption>\n" +
    "</rowdata>\n" +
    "</pyUseGadgets>\n" +
    "</rowdata>\n" +
    "<rowdata REPEATINGINDEX=\"2\">\n" +
    "<pxObjClass>Embed-Pega-PortalColumn</pxObjClass>\n" +
    "<pyType>WIDE</pyType>\n" +
    "<pyUseGadgets REPEATINGTYPE=\"PageList\">\n" +
    "<rowdata REPEATINGINDEX=\"1\">\n" +
    "<pxObjClass>Embed-Pega-PortalGadget</pxObjClass>\n" +
    "<pyGadgetName>PortalError</pyGadgetName>\n" +
    "<pyGadgetCaption>Portal Error</pyGadgetCaption>\n" +
    "<pyInitialOpenState>true</pyInitialOpenState>\n" +
    "</rowdata>\n" +
    "</pyUseGadgets>\n" +
    "</rowdata>\n" +
    "</pyColumn>\n" +
    "</rowdata>\n" +
    "<rowdata REPEATINGINDEX=\"2\">\n" +
    "<pxObjClass>Embed-Pega-PortalPage</pxObjClass>\n" +
    "<pyCaption>Play</pyCaption>\n" +
    "</rowdata>\n" +
    "</pyPortalPages>\n" +
    "<pyCommonParams>\n" +
    "</pyCommonParams>\n" +
    "<pyLandingMenu>\n" +
    "<pxObjClass>Pega-Landing</pxObjClass>\n" +
    "</pyLandingMenu>\n" +
    "<pyGadget REPEATINGTYPE=\"PageGroup\">\n" +
    "<rowdata REPEATINGINDEX=\"Worklist\">\n" +
    "<pyContentClass>Work-</pyContentClass>\n" +
    "<pxObjClass>Data-Gadget</pxObjClass>\n" +
    "<pyName>Worklist</pyName>\n" +
    "<pyContentActivity>WideWorklist</pyContentActivity>\n" +
    "<pyRefreshInterval>30</pyRefreshInterval>\n" +
    "<pxSubscript>Worklist</pxSubscript>\n" +
    "<pyEnabled>Y</pyEnabled>\n" +
    "<pySelections REPEATINGTYPE=\"PropertyList\">\n" +
    "<rowdata REPEATINGINDEX=\"1\"/>\n" +
    "</pySelections>\n" +
    "<pyParams REPEATINGTYPE=\"PageList\">\n" +
    "<rowdata REPEATINGINDEX=\"1\">\n" +
    "<pxObjClass>Embed-InterfaceParameter</pxObjClass>\n" +
    "<pyParameterName>UserID</pyParameterName>\n" +
    "<pyPropertyName>Param.UserIdentifier</pyPropertyName>\n" +
    "</rowdata>\n" +
    "</pyParams>\n" +
    "</rowdata>\n" +
    "</pyGadget>\n" +
    "<pyCustomPortalParams>\n" +
    "</pyCustomPortalParams>\n" +
    "<pxWarningsToDisplay REPEATINGTYPE=\"PageList\"/>\n" +
    "</pagedata>\n";

describe("Client", function() {
  let page;
  /*let apiContents = [
    "_injectDependencies",
    "start",
    "stop",
    "registerEventCallback",
    "clear",
    "displayTraceEvent",
    "getEventHeader",
  ]*/

  beforeEach(function() {
    // page = new Page("", {}, true);
  });
  
  it("has the expected public API", function(){
    // expect(tracer).toHavePublicAPI(apiContents)
  });



  it("supports basic page", function(){


    /*let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(response,"text/xml");

    let element = xmlDoc.getElementsByTagName("tracelog")[0];

    page.parseFromXML(element);*/

    Parser.parseString(xml, function (err, result) {
      // console.log(result);
    });


  });

  it("can use the output of xml2js", function(){
    let page = new Page("name",xml3);
  })
});


//parse top level properties, embedded pages, multiple level of embedded pages, page lists, page groups, value lists, value groups
