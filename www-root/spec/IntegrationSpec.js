describe("Integration", function() {
	var myCompetition, values, myEvent;

	// Load fixtures
	values = getJSONFixture('integration_values.json');

	console.log(values);

	it("should throw an error when Competition.addEvent(Event) and Event.startTime < Competition.startTime", function() {

		// Create Competition and Event objects
		myCompetition = new Competition(values.construct.startTime, values.construct.endTime);
		myEvent = new Event(values.construct.earlyStartTime, // <-- Here is the value that should trigger the error
							values.construct.endTime,
							values.construct.gymnasticsType,
							values.construct.participantsType,
							values.construct.participantsGender,
							values.construct.isIndividual,
							values.construct.isAllRound,
							values.construct.judgesArray1
							);


		expect(function(){
							myCompetition.addEvent(myEvent);
						}).toThrow(
							new Error("ERROR: Event.startTime cannot be less than Competition.startTime")
						);
	});

	it("should throw an error when Competition.addEvent(Event) and Event.endTime > Competition.endTime", function() {

		// Create Competition and Event objects
		myCompetition = new Competition(values.construct.startTime, values.construct.endTime);
		myEvent = new Event(values.construct.startTime,
							values.construct.lateEndTime, // <-- Here is the value that should trigger the error
							values.construct.gymnasticsType,
							values.construct.participantsType,
							values.construct.participantsGender,
							values.construct.isIndividual,
							values.construct.isAllRound,
							values.construct.judgesArray1
							);

		expect(function(){
							myCompetition.addEvent(myEvent);
						}).toThrow(
							new Error("ERROR: Event.endTime cannot be higher than Competition.endTime")
						);
	});

	it("should throw an error when Competition.addEvent(Event) and Event has missing properties", function() {

		// Create Competition and Event objects
		myCompetition = new Competition(values.construct.startTime, values.construct.endTime);
		myEvent = new Event(values.construct.startTime, values.construct.lateEndTime);

		expect(function(){
							myCompetition.addEvent(myEvent);
						}).toThrow(
							new Error()
						);
	});

	it("should throw an error when Competition.addEvent(Event) and Event is allready present in the Competition object.", function() {

		// Create Competition and Event objects
		myCompetition = new Competition(values.construct.startTime, values.construct.endTime);
		myEvent = new Event(values.construct.startTime,
							values.construct.endTime,
							values.construct.gymnasticsType,
							values.construct.participantsType,
							values.construct.participantsGender,
							values.construct.isIndividual,
							values.construct.isAllRound,
							values.construct.judgesArray1
							);

		// Add the first time.
		myCompetition.addEvent(myEvent);

		// Now add the second time and expect error.
		expect(function(){
							myCompetition.addEvent(myEvent);
						}).toThrow(
							new Error("ERROR: Identical Event allready exists in Competition object.")
						);
	});

	it("should throw an error when Competition.eventsArray has an Event object with a judge assigned to it and a new event is added over the same period of time with the same judge.", function() {

		// Create Competition and Event objects
		myCompetition = new Competition(values.construct.startTime, values.construct.endTime);
		myEvent = new Event(values.construct.startTime,
							values.construct.endTime,
							values.construct.gymnasticsType,
							values.construct.participantsType,
							values.construct.participantsGender,
							values.construct.isIndividual,
							values.construct.isAllRound,
							values.construct.judgesArray1
							);

		myOtherEvent = new Event(values.construct.startTime + 500,
							values.construct.endTime - 500,
							values.construct.otherGymnasticsType,
							values.construct.otherParticipantsType,
							values.construct.otherParticipantsGender,
							values.construct.isIndividual,
							values.construct.isAllRound,
							values.construct.judgesArray1	// <-- Same judge, some other values differ
							);

		// Add the first event.
		myCompetition.addEvent(myEvent);

		// Add second event. Should output error that judge is allready busy.
		expect(function(){
							myCompetition.addEvent(myOtherEvent);
						}).toThrow(
							new Error("ERROR: Registered Judge is busy over this period of time.")
						);

	});
});