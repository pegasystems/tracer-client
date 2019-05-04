module.exports = function(aField, aOperator, aValue){
  let field = aField;
  let operator = aOperator;
  let value = aValue;
  let id;

  function getField(){
    return field;
  }
  function getOperator(){
    return operator;
  }
  function getValue(){
    return value;
  }
  function getID(){
    return id;
  }

  publicAPI = {};

  publicAPI.operators = {
    EQUAL : 0,
    CONTAINS: 1
  }
  publicAPI.getField = getField;
  publicAPI.getOperator = getOperator;
  publicAPI.getValue = getValue;
  publicAPI.getID = getID;
  return publicAPI;
}
module.exports.fields = {
  THREAD : 0,
  RULESET: 1,
  RULESETVERSION : 2,
  PAGENAME : 3
}

module.exports.operators = {
  EQUAL : 0,
  CONTAINS: 1
}