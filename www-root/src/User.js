"use strict";

function User(username, password, email, cellphone){

    var _username,
        _password,
        _email,
        _cellphone;

    // Properties with Getters and Setters
    Object.defineProperties(this, {
        "username": {
            get: function(){ return _username || ""; },

            set: function(value){
                if(value.length >= 3){

                    _username = value;

                } else{
                    throw new Error("ERROR: the username must be at least 3 chars in length.");
                }
            }
        },
        "password": {
            get: function(){ return _password || ""; },

            set: function(value){
                if(value.length >= 5){

                    _password = value;

                } else{
                    throw new Error("ERROR: the password must be at least 5 chars in length.");
                }
            }
        },
        "email": {
            get: function(){ return _email || ""; },

            set: function(value){
                if(value.length > 4 && validateEmail(value)){
                    _email = value;
                }
                else{
                    throw new Error("ERROR: e-mail address did not validate.");
                }
            }
        },
        "cellphone": {
            get: function(){ return _cellphone || ""; },

            set: function(value){
                if(value.length > 4 && isNumeric(value)){
                    _cellphone = value;
                }
                else{
                    throw new Error("ERROR: cellphone number must be numeric and at least 5 chars of length.");
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

                    console.log(event);
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