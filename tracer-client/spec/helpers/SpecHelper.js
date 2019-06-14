beforeEach(function(){
  jasmine.addMatchers({
    /** This matcher accepts and object, and an array of strings.
     * it verifies that the strings in the array match the set of
     * functions on the object.
     **/
    toHavePublicAPI: function() {
      return {
        compare: function(publicAPI, expectedAttributes){
          result = {pass: true};
          for(var attr in publicAPI){
            if(expectedAttributes.indexOf(attr)==-1){
              result.pass = false;
              result.message+="Attribute "+attr+" should not be included in the public api.\n";
            }
            if(typeof publicAPI[attr] !=="function"){
              result.pass = false;
              result.message+="Attribuete "+attr+" was found, but was not a function.\n";
            }
          }
          for(var index in expectedAttributes){
            var functionName = expectedAttributes[index];
            if(typeof publicAPI[functionName]!=="function"){
              result.pass = false;
              result.message+="function "+functionName+" was not found in the public api.\n";
            }
          }
          return result;

        }
      }
    }
  })
});