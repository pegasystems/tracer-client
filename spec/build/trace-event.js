"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter_1 = require("./filter");
class TraceEvent {
    applyFilter(filter) {
        let filterResult = true;
        let field = filter.field;
        let operator = filter.operator;
        let value = filter.value;
        let targetValue = "";
        switch (field) {
            case filter_1.Field.THREAD:
                targetValue = this.threadname;
                break;
            case filter_1.Field.RULESET:
                targetValue = this.sRSName;
                break;
            case filter_1.Field.RULESETVERSION:
                targetValue = this.sRSVersion;
            default:
                break;
        }
        switch (operator) {
            case filter_1.Operator.EQUAL:
                filterResult = targetValue == value;
                break;
            case filter_1.Operator.CONTAINS:
                filterResult = value.indexOf(targetValue) > 0;
                break;
            default:
                filterResult = true;
        }
        return filterResult;
    }
}
exports.TraceEvent = TraceEvent;
//# sourceMappingURL=trace-event.js.map