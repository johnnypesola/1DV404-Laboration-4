"use strict"

	window.onload = function(){

		var startTime = new Date(2014, 12, 24).getTime(),
			endTime = new Date(2014, 12, 28).getTime(),
			myCompetition = new Competition(startTime, endTime),
			myEvent = new Event(startTime, endTime);


		myEvent.addJudge({fullName: "Jens Persson", email: "jens@persson.se"});

		myCompetition.addEvent(myEvent);

		console.log(typeof "fisk23" === "boolean")
	}