TraceEvent = require("./trace-event")

module.exports = function(){
  var sequenceNumber = 1;
  function connect(callbacks){
    callbacks.success();
  }
  function clear(){
    sequenceNumber = 1;
  }
  function getTraceEvents(callbacks){
    setTimeout(function(){
      eventList = new Array();
      event = new TraceEvent();
      event.activityName = "activityName"+sequenceNumber;
      event.interaction = "1";
      event.sequenceNumber = sequenceNumber;
      event.threadname = "STANDARD2";
      event.eventType = "Activity 2Begin";
      event.methodName = "Property-Set";
      event.stepStatus = "Good";
      event.rulesetName = "Pega-Desktop";
      event.rulesetVersion = "07-10-35";
      event.timeStamp = "0.000";
      event.primaryPageName = "pyWorkPage";
      eventList.push(event);
      callbacks.success(eventList);
      sequenceNumber++;
    }, 1000);

  }
  function getTraceEvent(){}
  function setOptions(){}
  function disconnect(){}

  let publicAPI = {}
  publicAPI.connect = connect;
  publicAPI.clear = clear;
  publicAPI.getTraceEvents = getTraceEvents;
  publicAPI.getTraceEvent = getTraceEvent;
  publicAPI.setOptions = setOptions;
  publicAPI.disconnect = disconnect;
  return publicAPI;
}
