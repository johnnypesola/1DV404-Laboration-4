"use strict";

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

                        // Check that endTime is not before startTime
                        if(this.startTime && this.startTime > value) {
                            throw new Error("ERROR: endTime cannot be before startTime");
                        }

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

	    // Assign default values to object
	    this.startTime = startTime;
	    this.endTime = endTime;
	}

    Competition.prototype = {
    	
    	constructor: 	Competition,

    	addEvent: function(eventObj){

			// Check that event is an object of right type.
			if(eventObj !== null && eventObj instanceof Event){

                // Check that event does not start before this competition
                if (eventObj.startTime < this.startTime) {
                    throw new Error("ERROR: Event.startTime cannot be less than Competition.startTime");

                // Check that the event does not end after this competition
                } else if (eventObj.endTime > this.endTime) {

                    throw new Error("ERROR: Event.endTime cannot be higher than Competition.endTime");

                // Check that the event does not have missing properties
                } else if (
                    eventObj.gymnasticsType === "" ||
                    eventObj.participantsType === "" ||
                    eventObj.participantsGender === "" ||
                    eventObj.isIndividual === "" ||
                    eventObj.isAllRound === "" ||
                    eventObj.judgesArray.length === 0
                ) {
                    throw new Error("ERROR: Event object has missing properties.");
                }

                // Check if an identical event exists in the competition or if judge will be double booked
                this.eventsArray.forEach(function(event) {

                    // Check identical
                    if (event.toString() === eventObj.toString()) {

                        throw new Error("ERROR: Identical Event allready exists in Competition object.")
                    }

                    // Check if the judge will be double booked
                    event.judgesArray.forEach(function (judgeObj) {
                        eventObj.judgesArray.forEach(function (newJudgeObj) {
                            if (JSON.stringify(judgeObj) === JSON.stringify(newJudgeObj)) {
                                throw new Error("ERROR: Registered Judge is busy over this period of time.");
                            }
                        });
                    });
                });

				// Add event to array of events
				this.eventsArray.push(eventObj);

				// Notify event judges.
				eventObj.notifyJudges();
			}
    	},

    	save: function(){ // Not implemented

    	}
    };