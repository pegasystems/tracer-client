import {Filter, Field, Operator} from "./filter";
import {Page} from "./page";

export class TraceEvent {
    activityNumber : string;
    activityName : string;
    alertLabel : string;
    DBTData: string;
    eventKey: string;
    eventName: string;
    eventNode: string;
    eventType: string;
    adpTracerKey: string;
    adpTracerRackKey: string;
    adpLoadPageName: string;
    adpQueueEvent: boolean;
    aaQueueEvent: boolean;
    hasMessages: boolean;
    interaction: string;
    threadName: string;
    interactionBytes: string;
    interactionQueryParam: string;
    methodName: string;
    stepStatus: string;
    stepMethod: string;
    stepNumber: string;
    primaryPageName: string;
    primaryPage: Page;
    sInsKey: string;
    sKeyName: string;
    sRSName: string;
    sRSVersion: string;
    timeStamp: string;
    sequenceNumber: number;
    endSequenceNumber: string;
    childEvents: Array<TraceEvent>;
    parentEvent: TraceEvent;

    applyFilter(filter: Filter){
        let filterResult = true;
        let field = filter.field;
        let operator = filter.operator;
        let value = filter.value;
        let targetValue = "";
        switch (field){
            case Field.THREAD:
                targetValue = this.threadName;
                break;
            case Field.RULESET:
                targetValue = this.sRSName;
                break;
            case Field.RULESETVERSION:
                targetValue = this.sRSVersion;
            default :
                break;
        }
        switch (operator){
            case Operator.EQUAL:
                filterResult = targetValue == value;
                break;
            case Operator.CONTAINS:
                filterResult = value.indexOf(targetValue)>0;
                break;
            default:
                filterResult = true;
        }
        return filterResult;
    }
}
