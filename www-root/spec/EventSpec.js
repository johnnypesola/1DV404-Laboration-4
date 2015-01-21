describe("Event", function() {
	var myEvent, goodValues, badValues;

	// Load fixtures
	goodValues = getJSONFixture('event_good_values.json');
	badValues = getJSONFixture('bad_values.json');

// Test constructors
	it("should be created with correct properties from good constructor values", function() {

		myEvent = new Event(goodValues.construct.startTime,
							goodValues.construct.endTime,
							goodValues.construct.gymnasticsType,
							goodValues.construct.participantsType,
							goodValues.construct.participantsGender,
							goodValues.construct.isIndividual,
							goodValues.construct.isAllRound,
							goodValues.construct.judgesArray1
							);

		// Check if properties for match with constructor data.
		expect(myEvent.startTime.getTime()).toEqual(goodValues.construct.startTime);
		expect(myEvent.endTime.getTime()).toEqual(goodValues.construct.endTime);
		expect(myEvent.gymnasticsType).toEqual(goodValues.construct.gymnasticsType);
		expect(myEvent.participantsType).toEqual(goodValues.construct.participantsType);
		expect(myEvent.participantsGender).toEqual(goodValues.construct.participantsGender);
		expect(myEvent.isIndividual).toEqual(goodValues.construct.isIndividual);
		expect(myEvent.isAllRound).toEqual(goodValues.construct.isAllRound);
		expect(myEvent.judgesArray).toEqual(goodValues.construct.judgesArray1);
	});


	it("should throw an error when created with bad constructor startTime argument", function() {
		expect(function(){
							new Event(badValues.int1,
									  badValues.float1
									  )
		}).toThrow(
				new Error("ERROR: the startTime argument must be a unix timestamp (but in miliseconds)")
		);
	});

	it("should throw an error when created with bad constructor endTime argument", function() {
		expect(function(){
							new Event(goodValues.construct.startTime,
									  badValues.string1
									  )
		}).toThrow(
				new Error("ERROR: the endTime argument must be a unix timestamp (but in miliseconds)")
		);
	});

	it("should throw an error when created with bad constructor gymnasticsType argument", function() {
		expect(function(){
							new Event(goodValues.construct.startTime,
									  goodValues.construct.endTime,
									  badValues.int1
									  )
		}).toThrow(
				new Error("ERROR: gymnasticsType must be a string")
		);
	});

	it("should throw an error when created with bad constructor participantsType argument", function() {
		expect(function(){
							new Event(goodValues.construct.startTime,
									  goodValues.construct.endTime,
									  goodValues.construct.gymnasticsType,
									  badValues.boolean1
									  )
		}).toThrow(
				new Error("ERROR: participantsType must be a string")
		);
	});

	it("should throw an error when created with bad constructor participantsGender argument", function() {
		expect(function(){
							new Event(goodValues.construct.startTime,
									  goodValues.construct.endTime,
									  goodValues.construct.gymnasticsType,
									  goodValues.construct.participantsType,
									  badValues.float1
									  )
		}).toThrow(
				new Error("ERROR: participantsGender must be a string")
		);
	});

	it("should throw an error when created with bad constructor isIndividual argument", function() {
		expect(function(){
							new Event(goodValues.construct.startTime,
									  goodValues.construct.endTime,
									  goodValues.construct.gymnasticsType,
									  goodValues.construct.participantsType,
									  goodValues.construct.participantsGender,
									  badValues.int1
									  )
		}).toThrow(
				new Error("ERROR: isIndividual must be a boolean")
		);
	});

	it("should throw an error when created with bad constructor isAllRound argument", function() {
		expect(function(){
							new Event(goodValues.construct.startTime,
									  goodValues.construct.endTime,
									  goodValues.construct.gymnasticsType,
									  goodValues.construct.participantsType,
									  goodValues.construct.participantsGender,
									  goodValues.construct.isIndividual,
									  badValues.string1
									  )
		}).toThrow(
				new Error("ERROR: isAllRound must be a boolean")
		);
	});

	it("should throw an error when created with bad constructor judgesArray argument", function() {
		expect(function(){
							new Event(goodValues.construct.startTime,
									  goodValues.construct.endTime,
									  goodValues.construct.gymnasticsType,
									  goodValues.construct.participantsType,
									  goodValues.construct.participantsGender,
									  goodValues.construct.isIndividual,
									  goodValues.construct.isAllRound,
									  badValues.string2
									  )
		}).toThrow(
				new Error("ERROR: judgesArray must be an array")
		);
	});


// Test methods
	it("should have correct judgesArray after using 'addJudge' method", function() {
		myEvent = new Event(goodValues.construct.startTime, goodValues.construct.endTime);

		// Add Judge
		myEvent.addJudge(goodValues.construct.judgesArray1[0]);

		expect(myEvent.judgesArray[0]).toEqual(goodValues.construct.judgesArray1[0]);
		
	});

	it("should throw an error after using 'addJudge' with faulty argument.", function() {
		myEvent = new Event(goodValues.construct.startTime, goodValues.construct.endTime);

		// Add Judge
		expect(function(){
							myEvent.addJudge(badValues.judgesArray1[0])
		}).toThrow(
				new Error("addJudge method argument object must contain the properties: 'fullName' and ('email' or 'sms')")
		);
		
	});

	it("should should run 'sendEmail' method or 'sendSms' method correct after using 'notifyJudges' method", function() {
		myEvent = new Event(goodValues.construct.startTime, goodValues.construct.endTime);

		// Add Judge the static way.
		myEvent.judgesArray = goodValues.construct.judgesArray2;
		
		// Add spies to methods.
		spyOn(Event.prototype, 'sendEmail').and.callThrough();
		spyOn(Event.prototype, 'sendSms').and.callThrough();

		// Rund nofity judges method
		myEvent.notifyJudges();

		// Check that sendSms was called with right value
		expect(myEvent.sendSms).toHaveBeenCalledWith(goodValues.construct.judgesArray2[0].sms)
		
		// Check that sendEmail was called with right value
		expect(Event.prototype.sendEmail).toHaveBeenCalledWith(goodValues.construct.judgesArray2[1].email)

	});

});