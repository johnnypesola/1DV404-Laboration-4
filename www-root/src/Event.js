"use strict"

	function Event(startTime, endTime, gymnasticsType, participantsType, participantsGender, isIndividual, isAllRound, judgesArray){

		var _startTime,
			_endTime,
			_gymnasticsType,
			_participantsType,
			_participantsGender,
			_isIndividual,
			_isAllRound,
			_judgesArray,
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
	        "gymnasticsType": {
	            get: function(){ return _gymnasticsType || ""; },
	            
	            set: function(value){
	                if(value !== null && typeof value === "string"){
	                    _gymnasticsType = value;
	                }
	                else{
	                    throw new Error("ERROR: gymnasticsType must be a string");
	                }
	            }
	        },
	        "participantsType": {
	            get: function(){ return _participantsType || ""; },
	            
	            set: function(value){
	                if(value !== null && typeof value === "string"){
	                    _participantsType = value;
	                }
	                else{
	                    throw new Error("ERROR: participantsType must be a string");
	                }
	            }
	        },
	        "participantsGender": {
	            get: function(){ return _participantsGender || ""; },
	            
	            set: function(value){
	                if(value !== null && typeof value === "string"){
	                    _participantsGender = value;
	                }
	                else{
	                    throw new Error("ERROR: participantsGender must be a string");
	                }
	            }
	        },
	        "isIndividual": {
	            get: function(){ return _isIndividual || false; },
	            
	            set: function(value){
	                if(value !== null && typeof value === "boolean"){
	                    _isIndividual = value;
	                    //console.log(value + " " + isIndividual);
	                }
	                else{
	                    throw new Error("ERROR: isIndividual must be a boolean");
	                }
	            }
	        },
	        "isAllRound": {
	            get: function(){ return _isAllRound || false; },
	            
	            set: function(value){
	                if(value !== null && typeof value === "boolean"){
	                    _isAllRound = value;
	                }
	                else{
	                    throw new Error("ERROR: isAllRound must be a boolean");
	                }
	            }
	        },
	        "judgesArray": {
	            get: function(){ return _judgesArray || []; },
	            
	            set: function(value){
	                if(value !== null && value instanceof Array){
	                    _judgesArray = value;
	                }
	                else{
	                    throw new Error("ERROR: judgesArray must be an array");
	                }
	            }
	        }
	    });

       	// Assing default values to object
	    this.startTime = startTime;
	    this.endTime = endTime;
	    this.gymnasticsType = gymnasticsType || "";
	    this.participantsType = participantsType || "";
	    this.participantsGender = participantsGender || "";
	    this.isIndividual = isIndividual || false;
	    this.isAllRound = isAllRound || false;
	    this.judgesArray = judgesArray || [];
	}

    Event.prototype = {
    	
    	constructor: 	Event,

    	addJudge: function(judgeObj){

			// Check that judge is an object.
			if(judgeObj !== null && judgeObj instanceof Object){

				// Check if something is missing from the judge object
				if(!(judgeObj.fullName) || !(judgeObj.email) && !(judgeObj.sms)){
					throw new Error("addJudge method argument object must contain the properties: 'fullName' and ('email' or 'sms')");
				}

				// Add judge to array of judges
				this.judgesArray.push(judgeObj);

			}
			else{
				throw new Error("addJudge method argument must be an object");
			}
    	},

    	notifyJudges: function(){
    		var i;

    		for(i = 0; i < this.judgesArray.length; i++){

    			// Try to send email to judge.
				if(this.judgesArray[i].sms){
					this.sendSms(this.judgesArray[i].sms);
				}
				// Try to send sms to judge.
				else if(this.judgesArray[i].email){
					this.sendEmail(this.judgesArray[i].email);
				}
    		}
    	},

    	sendEmail: function(emailAddress){ // Not implemented
			//console.log("Email sent to: " + emailAddress);
    	},
		sendSms: function(phoneNumber){ // Not implemented
			//console.log("SMS sent to: " + phoneNumber);
    	}
    };