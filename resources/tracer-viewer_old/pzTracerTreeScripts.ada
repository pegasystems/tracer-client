function TracerTree(){
    this.stack = [];
    this.parentNode = {};
    this.currentNode = {};
    this.currentNodeId = "";
    this.jsTree={};
    this.sequenceArray = [];

    this.updateTreeWithEvent  = function(event){
        if(!this.currentNodeId){
            this.currentNodeId = '#';
        }
        if(event.eventTypeState == 'Begin'){
            this.doEventBegin(event);
        } else {
            this.doEventEnd(event);
        }
    }

    this.doEventBegin = function(event){
        event.parentEvent = this.stack[this.stack.length -1];
        var treeNode = event.getTreeNode();
        if(treeNode!=null) {
            var nodeID = this.jsTree.jstree(true).create_node(this.currentNodeId, {'text': treeNode.outerHTML, 'state': {'opened': true}});
            this.currentNode = $("#" + nodeID);
            this.currentNodeId = nodeID;
        }
        this.stack.push(event);
    }

    this.doEventEnd = function(event){
        event.closeTreeNode(this.currentNode);
        this.stack.pop();
        this.currentNode = this.currentNode.parent();
        this.currentNodeId = this.jsTree.jstree(true).get_parent(this.currentNodeId);
    }
}

var tracerTree;

function doStepBegin(event) {
    var nodeText = "<a href='#"+hrefTarget+"' sequenceNumber='"+sequenceNumber+"'  sequenceList='blankList'><span class='stepLabel'>Step " + event.stepNumber + "</span>" +	"<span class='stepMethod' >" + event.stepMethod + "</span><span class='stepLabelHideJump'>Jump</span></a>";
}

// get a sequence list.  This is a list of sequence number for a given step (bunch of start, when begin/end and stop)
// will be everything in a step unless we branch off (activity, data transform, stream), those will not be included,
// but post whens will.
//
// In order for this to work, all start, stop, begin when and end when have to push their sequence numbers on to the 
// sequencyArray.  When we branch, we will dump the current list to the stop.  When we return to the step (at the end)
// well have more, and these will get appended to the list.
function getSequenceList(scope) {
    var sequenceList = "";
    for (var i=0; i < scope.sequenceArray.length; i++) {
        if (i>0) {
            sequenceList += ",";
        }
        sequenceList += scope.sequenceArray[i];
    }
    scope.sequenceArray = new Array();
    return(sequenceList);
}

// a sequence list already exists and we need to append more to it
function appendToSequenceList(stepText, appendList) {
    var currentSequenceList = "";
    var startIndex = stepText.indexOf("sequenceList");
    startIndex += 14;
    currentSequenceList = stepText.substring(startIndex);
    currentSequenceList = currentSequenceList.substring(0, currentSequenceList.indexOf("'"));
    var searchString = "sequenceList='" + currentSequenceList + "'";
    var replaceString = "sequenceList='" + currentSequenceList + "," + appendList + "'";
    stepText = stepText.replace(searchString, replaceString);
    return(stepText);
}

// either put in the sequence list, or if none, the regular sequence number
function setSequenceList(sequenceNumber, scope) {
    var stepText = scope.jsTree.jstree(true).get_text(scope.currentNodeId);

    if (scope.sequenceArray.length > 0) {

        if (stepText.indexOf("blankList") >=0) {
            stepText = stepText.replace("blankList", getSequenceList(scope));
        }
        else {
            if (stepText.indexOf("sequenceList") >=0) {
                stepText = appendToSequenceList(stepText, getSequenceList(scope));
            }
        }
    } else {
        stepText = stepText.replace("blankList", sequenceNumber);
    }
    scope.jsTree.jstree(true).set_text(scope.currentNodeId, stepText);
}

function doStepEnd(event) {
    var sequenceNumber = event.sequenceNumber;
    setSequenceList(sequenceNumber, scope);
    // if the status of the step end is "skip", then we will change style
    if (event.mStepStatus.indexOf("Skip Step") >=0) {
        var stepText = scope.jsTree.jstree(true).get_text(scope.currentNodeId);
        stepText =stepText.replace("stepLabel", "stepLabelSkip");
        scope.jsTree.jstree(true).set_text(scope.currentNodeId, stepText);
        //alert("set line through");
    } else if (event.mStepStatus.indexOf("Jump") >=0) {
        var stepText = scope.jsTree.jstree(true).get_text(scope.currentNodeId);
        stepText =stepText.replace("stepLabelHideJump", "stepLabelShowJump");

        scope.jsTree.jstree(true).set_text(scope.currentNodeId, stepText);

    }

    scope.stack.pop();
    scope.currentNode = scope.currentNode.parent();
    scope.currentNodeId = scope.jsTree.jstree(true).get_parent(scope.currentNodeId);

}

function initializeTracerTreeScripts(){
    $("#TracerTree").on('click', function(){
        var target = window.event.target;
        while(target != null){

            // send a sequence list if have one, otherwise the sequence number
            var sequenceNumber = target.getAttribute("sequencenumber");
            var sequenceList = target.getAttribute("sequencelist");
            if(sequenceList){
                pega.u.d.Tracer.displayTraceEvent(sequenceList);
                break;
            }
            else if (sequenceNumber) {
                pega.u.d.Tracer.displayTraceEvent(sequenceNumber);
                break;
            }
            target = target.parentElement;
        }
    });
    loadResources("jQuery", "pzpega_ui_jquery_1.11.0.js", "script[src*='pzpega_ui_jquery_']");
}

function initializeTracerTree(){
    tracerTree = new TracerTree();
    tracerTree.jsTree = $("#TracerTree").jstree({'core':{'check_callback':true}});
}

var jQueryLoaded;
var jQueryUILoaded;
var jsTreeLoaded;


function loadResources(name, source, selector) {
    //Try and find the old resource to replace if a selector was supplied
    var oldResource;
    if (selector != null && selector != "") {
        oldResource = $(document).find(selector)[0];
    }

    //Load the resource
    var newResource = document.createElement('script');
    newResource.type = 'text/javascript';
    newResource.async = true;
    newResource.src = source;
    newResource.addEventListener('load', function() {scriptLoaded(name) },false);
    if (selector != null && selector != "" && oldResource != null) {
        oldResource.parentNode.replaceChild(newResource, oldResource);
    } else {
        (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newResource);
    }
    return;
}

function scriptLoaded(scriptName) {
    //On script load set flags, when all scripts are loaded activate the tree
    if (scriptName == "jQuery") {
        loadResources("jQueryUI", "pzpega_jquery-ui_1.10.3.js", "script[src*='pzpega_jquery-ui_']");
        jQueryLoaded = true;
    } else if (scriptName == "jQueryUI") {
        loadResources("jsTree", "pzpega_ui_jstree_3.0.0.js", null);
        jQueryUILoaded = true;
    } else if (scriptName == "jsTree") {
        jsTreeLoaded = true;
    }

    //If all scripts are loaded then activate
    if (jQueryLoaded && jQueryUILoaded && jsTreeLoaded) {
        initializeTracerTree();
    }
}

function buildSecondaryLayout(ruleset, rulesetVersion, stepPage, threadName){
    var secondaryLayout = "</div><div class='tree-node-content-secondary'>" +
        "<div class='tree-node-content-ruleset' title='"+ruleset+":"+rulesetVersion+"'>";
    if(ruleset!="") {
        secondaryLayout += "<span class='treeRuleSetAndVersionTag'>RS</span><span class='treeRuleSetAndVersion'>" + ruleset + ":" + rulesetVersion + "</span>";
    }
    secondaryLayout+="</div><div class='tree-node-content-steppage' title='"+stepPage+"'>";
    if(stepPage!=""){
        secondaryLayout += "<span class='treeStepPageTag' >SP</span><span class='treeStepPage'>" + stepPage + "</span></div>";
    }
    secondaryLayout += "</div><div class='tree-node-content-thread' title='"+threadName+"'>";
    if(threadName!="") {
        secondaryLayout += "<span class='treeThreadTag'>TH</span><span class='treeThread'>" + threadName + "</span></div>";
    }
    secondaryLayout += "</div>";
    return secondaryLayout;
}
