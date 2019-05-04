module.exports = function(aConnectionId) {
  /**
   * This module provides an interface for interacting with an events-service. It's primary function is to initialize a
   * tracer session, poll for new events, and store those events in memory for client side retrieval.
   */

  // Dependencies
  let TraceEvent = require('./trace-event');
  let Filter = require('./filter');
  let EventsService = require('./events-service');
  let Options = require('./options');
  let Utils = require('./utils');

  // Instance variables
  let eventsService = null;
  let connectionID = aConnectionId;
  let tracerInitialized = false;
  let tracerEnabled = false;
  let filters = [];
  let eventsList = [];
  let traceEventArray = [];
  let eventCallbacks = [
    function(currentEvent){
      // This is the default event callback which writes event details to the log.
      console.log(currentEvent.sequenceNumber + " " +
        currentEvent.activityName + " " +
        currentEvent.stepNumber + " " +
        currentEvent.eventType + " " +
        currentEvent.stepMethod + " " +
        currentEvent.stepStatus);
    }
  ];

  /**
   * Start a event service session and begin polling for new trace events
   */
  function initializeTracer(){
    if (connectionID == "") {
      throw "EmptyConnectionID";
    }

    if(!tracerInitialized){
      eventsService = new EventsService(connectionID);
      tracerInitialized = true;
    }

    eventsService.connect({
      success : mainTracerLoop,
      fail : function(){}
    });
  }

  /**
   * poll events service for trace events
   */
  function mainTracerLoop(){
    if(tracerEnabled) {
      eventsService.getTraceEvents({
        success : parseTraceResponse,
        error : function(aMessage){
          throw {
            name : "EventsServiceException",
            message : aMessage
          }
        }
      });
    }
  }

  function parseTraceResponse(eventsToAppend){
    if(eventsToAppend.length > 0) {
      appendEvents(eventsToAppend);
      setTimeout(mainTracerLoop, 10);
    } else {
      setTimeout(mainTracerLoop, 1000);
    }
  }

  /**
   * Invoke any registered events callbacks for each event in an array.
   * @param eventArray
   */
  function appendEvents(eventArray){
    for(var i =0; i< eventArray.length; i++){
      var currentEvent = eventArray[i];
      if(currentEvent) {
        eventsList.push(currentEvent);
        for (var k = 0; k < filters.length; k++) {
          if (!currentEvent.applyFilter(filters[k])) {
            return;
          }
        }
        if (currentEvent) {
          eventCallbacks.forEach(eventCallback => {eventCallback(currentEvent)});
        }
      }
    }
  }

  /**
   * End the session with the events service
   * @param bForceDisconnect
   */
  function disconnect(bForceDisconnect) {
    eventsService.disconnect(bForceDisconnect);
  }

  /**
   * Test the events service that it can delete all of it's stored events
   */
  function deleteTraceEvents() {
    eventsService.clear();
  }

  /**
   * Stop requesting trace events from the events service.
   */
  function stop(){
    if(tracerEnabled){
      tracerEnabled = false;
      disconnect();
    } else {
      // Do nothing
    }
  }

  /**
   * Start requesting trace events from the events service. Any regisitered callbacks will be invoked with the
   * results.
   */
  function start(){
    if(tracerEnabled){
      // Do nothing
    } else {
      tracerEnabled = true;
      initializeTracer();
    }
  }

  /**
   * Register a callback function which is invoked whenever the events service returns a list of events.
   * @param callback
   */
  function registerEventCallback(callback){
    eventCallbacks.push(callback)
  }

  /**
   * TODO Untested, likely works.
   * Request a single trace event.
   * @param eventNumber
   * @returns {*}
   */
  function getEventHeader(eventNumber){
    if(traceEventArray[eventNumber]) {
      return traceEventArray[eventNumber];
    } else {
      return -1;
    }
  }

  /**
   * TODO Untested, likely doesn't work.
   * Request the full content of a trace event from the events service, including primary page, parameter page, and
   * local variables.
   * @param callbacks
   */
  function displayTraceEvent(eventNumber, callbacks){
    eventsService.getTraceEvent(eventNumber, callbacks);
  }

  /**
   * All class dependencies can be swapped out with another object that fulfills the same role. This is useful for
   * jasmine tests, or providing alternate implementations.
   * @param args
   */
  function injectDependencies(args){
    for(var key in args){
      var value = args[key];
      switch(key) {
        case "EventsService":
          EventsService = value;
          break;
        case "TraceEvent":
          TraceEvent = value;
          break;
        case "Filter":
          Filter = value;
          break;
        case "Options":
          Options = value;
          break;
        case "Utils":
          Utils = value;
          break;
      }
    }
  }

  //public functions
  var publicAPI = {};
  publicAPI._injectDependencies = injectDependencies;
  publicAPI.start = start;
  publicAPI.stop = stop;
  publicAPI.registerEventCallback = registerEventCallback;
  publicAPI.clear = deleteTraceEvents;
  publicAPI.displayTraceEvent = displayTraceEvent;
  publicAPI.getEventHeader = getEventHeader;
  return publicAPI;
};