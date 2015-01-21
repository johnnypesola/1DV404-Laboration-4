describe("Competition", function() {
	var competition, goodValues, badValues;

	// Load fixtures
	goodValues = getJSONFixture('competition_good_values.json');
	badValues = getJSONFixture('bad_values.json');


	it("should be created with correct properties from good constructor values", function() {

		competition = new Competition(goodValues.construct.startTime, goodValues.construct.endTime);

		// Check if properties for startime and endtime match with constructor data.
		expect(competition.startTime.getTime()).toEqual(goodValues.construct.startTime);
		expect(competition.endTime.getTime()).toEqual(goodValues.construct.endTime);
	});

	it("should throw an error when created with bad constructor endTime argument", function() {
		expect(function(){
							new Competition(goodValues.construct.startTime, badValues.string1)}).toThrow(
								new Error("ERROR: the endTime argument must be a unix timestamp (but in miliseconds)"
							)
		);
	});

	it("should throw an error when created with bad constructor startTime argument", function() {
		expect(function(){
							new Competition(badValues.int1, badValues.float1)}).toThrow(
								new Error("ERROR: the startTime argument must be a unix timestamp (but in miliseconds)"
							)
		);
	});

});