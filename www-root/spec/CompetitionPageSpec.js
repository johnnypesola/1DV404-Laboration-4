describe("CompetitionPage", function() {
    var myCompetition, values, myEvent, myPage;

    // Load fixtures
    values = getJSONFixture('competition_page_values.json');

    it("should throw an error when trying to add a Competition with the same startTime and endTime as another competition that already exists.", function() {

        // Create Competition and Event objects
        myCompetition = new Competition(values.construct.startTime, values.construct.endTime);

        myPage = new CompetitionPage();

        // Add competition the first time.
        myPage.addCompetition(myCompetition);

        expect(function(){
            myPage.addCompetition(myCompetition);
        }).toThrow(
            new Error("ERROR: Two competitions that are exactly the same cannot exists.")
        );
    });



});