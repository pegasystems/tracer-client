module.exports = function (aConnectionID) {

  let Utils = require('./utils');

  let optionArray = [];
  let pyEventTypesList = "";
  let pyRuleSetsList = "";
  let pyPageNameList = "";
  let connectionID = aConnectionID;


  function parseValuesFromJSON(json, aConnectionID) {
    var jo = JSON.parse(json);
    optionArray["nOptTraceClassLoad"] = "N";
    optionArray["nOptTraceException"] = jo.pyTraceException;
    optionArray["nOptTraceJContextBegin"] = jo.pyTraceJContextBegin;
    optionArray["nOptTraceActivityBegin"] = jo.pyTraceActivityBegin;
    optionArray["nOptTraceActivityEnd"] = jo.pyTraceActivityEnd;
    optionArray["nOptTraceStepBegin"] = jo.pyTraceStepBegin;
    optionArray["nOptTraceStepEnd"] = jo.pyTraceStepEnd;
    optionArray["nOptTraceWhenBegin"] = jo.pyTraceWhenBegin;
    optionArray["nOptTraceWhenEnd"] = jo.pyTraceWhenEnd;
    optionArray["nOptTraceInputEditBegin"] = jo.pyTraceInputEditBegin;
    optionArray["nOptTraceInputEditEnd"] = jo.pyTraceInputEditEnd;
    optionArray["nOptTraceModelBegin"] = jo.pyTraceModelBegin;
    optionArray["nOptTraceModelEnd"] = jo.pyTraceModelEnd;
    optionArray["nOptExceptionBreak"] = jo.pyExceptionBreak;
    optionArray["nOptStatusFailBreak"] = jo.pyStatusFailBreak;
    optionArray["nOptStatusWarnBreak"] = jo.pyStatusWarnBreak;
    optionArray["nOptTraceAccessDenied"] = jo.pyTraceAccessDenied;
    optionArray["nOptExpandJavaPage"] = jo.pyExpandJavaPage;
    optionArray["nOptAbbreviateEvents"] = jo.pyAbbreviateEvents;
    optionArray["nOptMaxTraceEventsDisplayed"] = jo.pyMaxTraceEventsDisplayed == "" ? 5000 : jo.pyMaxTraceEventsDisplayed;
    optionArray["nOptLocalVariables"] = jo.pyLocalVariables;

    for (var i in optionArray) {
      if (!optionArray[i]) {
        optionArray[i] = "N";
      }
    }
    var sValue = "";
    var nIndex = 0;

    pyEventTypesList = "";
    var eventTypes = jo.pyUserEventTypesList;
    var nPos = eventTypes.indexOf(";");
    while (nPos > 0) {
      var sName = eventTypes.substring(0, nPos);
      eventTypes = eventTypes.substring(nPos + 1, eventTypes.length);
      nPos = sName.indexOf("/");
      if (nPos > 0) {
        sValue = sName.substring(nPos + 1, nPos + 2);
        sName = sName.substring(0, nPos);
        if (sValue == "Y" || sValue == "y") {
          nIndex += 1;
          pyEventTypesList += "&eventType" + nIndex + "=" + sName;
        }
      }
      else
        break;
      nPos = eventTypes.indexOf(";");
    }

    // init RuleSets
    nIndex = 0;
    pyRuleSetsList = "";
    var ruleSetList = jo.pxUserRuleSetList;
    nPos = ruleSetList.indexOf(";");
    while (nPos > 0) {
      sName = ruleSetList.substring(0, nPos);
      ruleSetList = ruleSetList.substring(nPos + 1, ruleSetList.length);
      nPos = sName.indexOf(":");
      if (nPos > 0) {
        sValue = sName.substring(nPos + 1, nPos + 2);
        sName = sName.substring(0, nPos);
        if (sValue == "Y" || sValue == "y") {
          nIndex += 1;
          pyRuleSetsList += "&ruleSet" + nIndex + "=" + sName;
        }
      } else {
        break;
      }
      nPos = ruleSetList.indexOf(";");
    }
  }

  function getQueryString() {
    var strPostData = Utils.getQueryString({
      pzDebugRequest: "settings",
      pzSetCmd: "SetOptions",
      pzOptTraceClassLoad: optionArray["nOptTraceClassLoad"],
      pzOptTraceException: optionArray["nOptTraceException"],
      pzOptTraceJContextBegin: optionArray["nOptTraceJContextBegin"],
      pzOptTraceActivityBegin: optionArray["nOptTraceActivityBegin"],
      pzOptTraceActivityEnd: optionArray["nOptTraceActivityEnd"],
      pzOptTraceStepBegin: optionArray["nOptTraceStepBegin"],
      pzOptTraceStepEnd: optionArray["nOptTraceStepEnd"],
      pzOptTraceWhenBegin: optionArray["nOptTraceWhenBegin"],
      pzOptTraceWhenEnd: optionArray["nOptTraceWhenEnd"],
      pzOptTraceInputEditBegin: optionArray["nOptTraceInputEditBegin"],
      pzOptTraceInputEditEnd: optionArray["nOptTraceInputEditEnd"],
      pzOptTraceModelBegin: optionArray["nOptTraceModelBegin"],
      pzOptTraceModelEnd: optionArray["nOptTraceModelEnd"],
      pzOptExceptionBreak: optionArray["nOptExceptionBreak"],
      pzOptStatusFailBreak: optionArray["nOptStatusFailBreak"],
      pzOptStatusWarnBreak: optionArray["nOptStatusWarnBreak"],
      pzOptTraceAccessDenied: optionArray["nOptTraceAccessDenied"],
      pzOptExpandJavaPage: optionArray["nOptExpandJavaPage"],
      pzOptAbbreviateEvents: optionArray["nOptAbbreviateEvents"],
      pzOptCollectLocalVars: optionArray["nOptLocalVariables"],
      pzOptSetPageNames: pyPageNameList,
      pzDebugConnection: connectionID
    });
    strPostData += pyEventTypesList;
    strPostData += pyRuleSetsList;
    return strPostData;
  }

  function clear() {

  }

  function applyDefaults() {
    parseValuesFromJSON(JSON.stringify(defaults));
  }

  let defaults = {
    "pxBreakPointAvailable": "true",
    "pxClipBoardViewerAvailable": "true",
    "pxConnectionID": "HZIFXUHZBN51NUATLG3POTUR3I92SFZGR",
    "pxConnectionListEnable": "true",
    "pxContinueAvailable": "true",
    "pxCreateDateTime": "20171117T215544.685 GMT",
    "pxCreateOperator": "feenr",
    "pxCreateOpName": "feenr",
    "pxCreateSystemID": "prpc",
    "pxInsName": "FEENR",
    "pxInspectorWatchAvailable": "true",
    "pxObjClass": "Data-TRACERSettings",
    "pxPausePlayEnable": "true",
    "pxSaveDateTime": "20171120T004459.077 GMT",
    "pxStepAvailable": "true",
    "pxTraceOptionsAvailable": "true",
    "pxTracerAccessibility": "true",
    "pxUserRuleSetList": "feenr@:Yes;Testing_Branch_Rspec-MBranch01:Yes;Testing_Branch_FT-Test-NotInApp:Yes;Testing_Branch_FT-Test-MBranch1:Yes;Testing_Branch_FT-Test-MBranch2:Yes;Testing_Branch_FT-Test-MBranch3:Yes;Testing_Branch_FT-Test-MBranch4:Yes;Testing_Branch_FT-Rspec-Merge01:Yes;Testing_Branch_FT-Rspec-Merge02:Yes;Testing_Branch_FT-Rspec-Merge03:Yes;Testing_Branch_FT-Rspec-Merge04:Yes;Testing_Branch_FT-Test-PegaBrch:Yes;Testing:Yes;LockedRS_Branch_FT-Test-LockRS:Yes;LockedRS:Yes;TestingInt_Branch_FT-Rspec-Merge03:Yes;TestingInt_Branch_FT-Rspec-Merge04:Yes;TestingInt:Yes;FT:Yes;FTInt:Yes;FTBranch:Yes;TestingFW:Yes;TestingFWInt:Yes;ActiveTests:Yes;RSpecPrepFW:Yes;RSpecPrepFWInt:Yes;RSpe:Yes;RSpeInt:Yes;PegaCoreRAPs:Yes;PegaTeamRAPs:Yes;ValidationEngineBase:Yes;PegaDeveloper:Yes;DashboardEngine:Yes;JSUnitStaging:Yes;Pega-ProcessCommander_Branch_Hackathon:Yes;Pega-ProcessCommander:Yes;Pega-DeploymentDefaults:Yes;Pega-DecisionScience:Yes;Pega-DecisionArchitect:Yes;Pega-LP-Mobile:Yes;Pega-LP-ProcessAndRules:Yes;Pega-LP-Integration:Yes;Pega-LP-Reports:Yes;Pega-LP-SystemSettings:Yes;Pega-LP-UserInterface:Yes;Pega-LP-OrgAndSecurity:Yes;Pega-LP-DataModel:Yes;Pega-LP-Application:Yes;Pega-LP:Yes;Pega-SystemOperations:Yes;Pega-UpdateManager:Yes;Pega-SecurityVA:Yes;Pega-Feedback:Yes;Pega-AutoTest:Yes;Pega-AppDefinition:Yes;Pega-ImportExport:Yes;Pega-LocalizationTools:Yes;Pega-RuleRefactoring:Yes;Pega-ProcessArchitect:Yes;Pega-Portlet:Yes;Pega-Content:Yes;Pega-BigData:Yes;Pega-NLP:Yes;Pega-DecisionEngine:Yes;Pega-IntegrationArchitect:Yes;Pega-SystemArchitect:Yes;Pega-Desktop_Branch_Hackathon:Yes;Pega-Desktop:Yes;Pega-EndUserUI:Yes;Pega-Survey:Yes;Pega-Social:Yes;Pega-API:Yes;Pega-EventProcessing:Yes;Pega-Reporting:Yes;Pega-UIDesign_Branch_FT-Test-PegaBrch:Yes;Pega-UIDesign:Yes;Pega-Gadgets:Yes;Pega-UIEngine:Yes;Pega-ProcessEngine:Yes;Pega-SearchEngine:Yes;Pega-IntegrationEngine:Yes;Pega-RulesEngine:Yes;Pega-Engine:Yes;PegaLegacyRules:Yes;Pega-ProCom:Yes;Pega-IntSvcs:Yes;Pega-WB:Yes;Pega-RULES:Yes;",
    "pxViewJavaCodeAvailable": "true",
    "pyAbbreviateEvents": "N",
    "pyExceptionBreak": "Y",
    "pyExpandJavaPage": "Y",
    "pyMaxTraceEventsDisplayed": "5000",
    "pyOperator": "feenr",
    "pySessionType": "STANDARD",
    "pyStatusFailBreak": "N",
    "pyStatusWarnBreak": "N",
    "pyTraceActionBegin": "Y",
    "pyTraceActionEnd": "Y",
    "pyTraceActivityBegin": "Y",
    "pyTraceActivityEnd": "Y",
    "pyTraceException": "N",
    "pyTraceInputEditBegin": "N",
    "pyTraceInputEditEnd": "N",
    "pyTraceJContextBegin": "N",
    "pyTraceModelBegin": "Y",
    "pyTraceModelEnd": "Y",
    "pyTraceStepBegin": "Y",
    "pyTraceStepEnd": "Y",
    "pyTraceWhenBegin": "Y",
    "pyTraceWhenEnd": "Y",
    "pyUserEventTypesList": "Log Messages/N;Alert/N;CaseType/N;Flow/N;Declare Constraint/N;Declare Expression/N;Declare Index/N;Declare OnChange/N;Declare Trigger/N;Declare DecisionTree/N;Declare DecisionTable/N;Declare DecisionMap/N;Declare Collection/N;Decision Parameters/N;Predictive Model/N;Scorecard/N;Strategy/N;Adaptive Model/N;Locking/N;DB Query/N;DB Cache/N;Services/N;SOAP Messages/N;Stream Rules/N;Parse Rules/N;Data Pages/N;Interaction/N;AutoPopulate Properties/N;Linked Page Hit/N;Linked Page Miss/N;ADP Load/N;Asynchronous Activity/N;",
    "pzInsKey": "DATA-TRACERSETTINGS FEENR",
    "pzTraceAllRulesets": "N",
    "pxUserRuleSets": [
      ""
    ]
  }


  let publicAPI = {};
  publicAPI.clear = clear;
  publicAPI.getQueryString = getQueryString;
  publicAPI.parseValuesFromJSON = parseValuesFromJSON;
  publicAPI.applyDefaults = applyDefaults;
  return publicAPI;
}