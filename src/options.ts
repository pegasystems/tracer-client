import {Utils} from './utils' ;

export class Options {
    optionArray: any;
    pyEventTypesList:string;
    pyRuleSetsList:string;
    pyPageNameList:string;
    connectionID:string;

    constructor(aConnectionID: string){
        this.connectionID = aConnectionID;
        this.optionArray = {};
    }

    parseValuesFromJSON(json: string) {
        let jo = JSON.parse(json);
        this.optionArray["nOptTraceClassLoad"] = "N";
        this.optionArray["nOptTraceException"] = jo.pyTraceException;
        this.optionArray["nOptTraceJContextBegin"] = jo.pyTraceJContextBegin;
        this.optionArray["nOptTraceActivityBegin"] = jo.pyTraceActivityBegin;
        this.optionArray["nOptTraceActivityEnd"] = jo.pyTraceActivityEnd;
        this.optionArray["nOptTraceStepBegin"] = jo.pyTraceStepBegin;
        this.optionArray["nOptTraceStepEnd"] = jo.pyTraceStepEnd;
        this.optionArray["nOptTraceWhenBegin"] = jo.pyTraceWhenBegin;
        this.optionArray["nOptTraceWhenEnd"] = jo.pyTraceWhenEnd;
        this.optionArray["nOptTraceInputEditBegin"] = jo.pyTraceInputEditBegin;
        this.optionArray["nOptTraceInputEditEnd"] = jo.pyTraceInputEditEnd;
        this.optionArray["nOptTraceModelBegin"] = jo.pyTraceModelBegin;
        this.optionArray["nOptTraceModelEnd"] = jo.pyTraceModelEnd;
        this.optionArray["nOptExceptionBreak"] = jo.pyExceptionBreak;
        this.optionArray["nOptStatusFailBreak"] = jo.pyStatusFailBreak;
        this.optionArray["nOptStatusWarnBreak"] = jo.pyStatusWarnBreak;
        this.optionArray["nOptTraceAccessDenied"] = jo.pyTraceAccessDenied;
        this.optionArray["nOptExpandJavaPage"] = jo.pyExpandJavaPage;
        this.optionArray["nOptAbbreviateEvents"] = jo.pyAbbreviateEvents;
        this.optionArray["nOptMaxTraceEventsDisplayed"] = jo.pyMaxTraceEventsDisplayed == "" ? 5000 : jo.pyMaxTraceEventsDisplayed;
        this.optionArray["nOptLocalVariables"] = jo.pyLocalVariables;
        this.optionArray["nOptConnectionId"] = jo.pxConnectionID;

        for (var i in this.optionArray) {
            if (!this.optionArray[i]) {
                this.optionArray[i] = "N";
            }
        }
        let sValue = "";
        let nIndex = 0;

        this.pyEventTypesList = "";
        let eventTypes = jo.pyUserEventTypesList;
        let nPos = eventTypes.indexOf(";");
        while (nPos > 0) {
            let sName = eventTypes.substring(0, nPos);
            eventTypes = eventTypes.substring(nPos + 1, eventTypes.length);
            nPos = sName.indexOf("/");
            if (nPos > 0) {
                sValue = sName.substring(nPos + 1, nPos + 2);
                sName = sName.substring(0, nPos);
                if (sValue == "Y" || sValue == "y") {
                    nIndex += 1;
                    this.pyEventTypesList += "&eventType" + nIndex + "=" + sName;
                }
            }
            else
                break;
            nPos = eventTypes.indexOf(";");
        }

        // init RuleSets
        nIndex = 0;
        this.pyRuleSetsList = "";
        let ruleSetList = jo.pxUserRuleSetList;
        nPos = ruleSetList.indexOf(";");
        while (nPos > 0) {
            let sName = ruleSetList.substring(0, nPos);
            ruleSetList = ruleSetList.substring(nPos + 1, ruleSetList.length);
            nPos = sName.indexOf(":");
            if (nPos > 0) {
                sValue = sName.substring(nPos + 1, nPos + 2);
                sName = sName.substring(0, nPos);
                if (sValue == "Y" || sValue == "y") {
                    nIndex += 1;
                    this.pyRuleSetsList += "&ruleSet" + nIndex + "=" + sName;
                }
            } else {
                break;
            }
            nPos = ruleSetList.indexOf(";");
        }
    }

    getQueryString() {
        let strPostData = Utils.getQueryString({
            pzDebugRequest: "settings",
            pzSetCmd: "SetOptions",
            pzOptTraceClassLoad: this.optionArray["nOptTraceClassLoad"],
            pzOptTraceException: this.optionArray["nOptTraceException"],
            pzOptTraceJContextBegin: this.optionArray["nOptTraceJContextBegin"],
            pzOptTraceActivityBegin: this.optionArray["nOptTraceActivityBegin"],
            pzOptTraceActivityEnd: this.optionArray["nOptTraceActivityEnd"],
            pzOptTraceStepBegin: this.optionArray["nOptTraceStepBegin"],
            pzOptTraceStepEnd: this.optionArray["nOptTraceStepEnd"],
            pzOptTraceWhenBegin: this.optionArray["nOptTraceWhenBegin"],
            pzOptTraceWhenEnd: this.optionArray["nOptTraceWhenEnd"],
            pzOptTraceInputEditBegin: this.optionArray["nOptTraceInputEditBegin"],
            pzOptTraceInputEditEnd: this.optionArray["nOptTraceInputEditEnd"],
            pzOptTraceModelBegin: this.optionArray["nOptTraceModelBegin"],
            pzOptTraceModelEnd: this.optionArray["nOptTraceModelEnd"],
            pzOptExceptionBreak: this.optionArray["nOptExceptionBreak"],
            pzOptStatusFailBreak: this.optionArray["nOptStatusFailBreak"],
            pzOptStatusWarnBreak: this.optionArray["nOptStatusWarnBreak"],
            pzOptTraceAccessDenied: this.optionArray["nOptTraceAccessDenied"],
            pzOptExpandJavaPage: this.optionArray["nOptExpandJavaPage"],
            pzOptAbbreviateEvents: this.optionArray["nOptAbbreviateEvents"],
            pzOptCollectLocalVars: this.optionArray["nOptLocalVariables"],
            pzOptSetPageNames: this.pyPageNameList,
            pzDebugConnection: this.connectionID
        });
        strPostData += this.pyEventTypesList;
        strPostData += this.pyRuleSetsList;
        return strPostData;
    }

    getOption(optionName: string){
        return this.optionArray[optionName];
    }

    clear() {
        this.optionArray = [];
    }

    applyDefaults() {
        this.parseValuesFromJSON(JSON.stringify(this.defaults));
    }

    defaults = {
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
}