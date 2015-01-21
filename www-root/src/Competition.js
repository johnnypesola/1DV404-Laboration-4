"use strict"

	function Competition(startTime, endTime){

		var _startTime,
			_endTime,
			_eventsArray = [],
			_MIN_TIMESTAMP = 1385769600000; // At least the year 2014

	    // Properties with Getters and Setters
	    Object.defineProperties(this, {
	        "startTime": {
	            get: function(){ return _startTime || ""; },
	            
	            set: function(value){
	            	var parsedValue = parseFloat(value);
	                if(value !== null && (!isNaN(parsedValue) && isFinite(parsedValue) && parsedValue >= _MIN_TIMESTAMP && parsedValue % 1 === 0 && value == parsedValue)){
	                    _startTime = new Date(value);
	                }
	                else{
	                    throw new Error("ERROR: the startTime argument must be a unix timestamp (but in miliseconds)");
	                }
	            }
	        },
	        "endTime": {
	            get: function(){ return _endTime || ""; },
	            
	            set: function(value){
	            	var parsedValue = parseFloat(value);
	                if(value !== null && (!isNaN(parsedValue) && isFinite(parsedValue) && parsedValue >= _MIN_TIMESTAMP && parsedValue % 1 === 0 && value == parsedValue)){
	                    _endTime = new Date(value);
	                }
	                else{
	                    throw new Error("ERROR: the endTime argument must be a unix timestamp (but in miliseconds)");
	                }
	            }
	        },
	        "eventsArray": {
	            get: function(){ return _eventsArray || ""; },
	            
	            set: function(value){
	                if(value !== null && value instanceof Array){
	                    _eventsArray = value;
	                }
	                else{
	                    throw new Error("ERROR: eventsArray must be an array");
	                }
	            }
	        }
	    });

	    // Assing default values to object
	    this.startTime = startTime;
	    this.endTime = endTime;
	}

    Competition.prototype = {
    	
    	constructor: 	Competition,

    	addEvent: function(eventObj){

			// Check that event is an object of right type.
			if(eventObj !== null && eventObj instanceof Event){

				// Add event to array of events
				this.eventsArray.push(eventObj);

				// Notify event judges.
				eventObj.notifyJudges();
			}
    	},

    	save: function(){ // Not implemented

    	}
    };