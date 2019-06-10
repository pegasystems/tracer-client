"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Filter {
    constructor(aField, aOperator, aValue) {
        this.field = aField;
        this.operator = aOperator;
        this.value = aValue;
    }
}
exports.Filter = Filter;
var Field;
(function (Field) {
    Field[Field["THREAD"] = 0] = "THREAD";
    Field[Field["RULESET"] = 1] = "RULESET";
    Field[Field["RULESETVERSION"] = 2] = "RULESETVERSION";
    Field[Field["PAGENAME"] = 3] = "PAGENAME";
})(Field = exports.Field || (exports.Field = {}));
var Operator;
(function (Operator) {
    Operator[Operator["EQUAL"] = 0] = "EQUAL";
    Operator[Operator["CONTAINS"] = 1] = "CONTAINS";
})(Operator = exports.Operator || (exports.Operator = {}));
//# sourceMappingURL=filter.js.map