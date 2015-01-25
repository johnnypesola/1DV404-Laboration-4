describe("User", function() {
	var user, goodValues, badValues;

	// Load fixtures
	goodValues = getJSONFixture('user_good_values.json');
	badValues = getJSONFixture('bad_values.json');

    // Clear localstorage
    localStorage.setItem('userObjArray', JSON.stringify([]));


	it("should be created with correct properties from good constructor values", function() {

		user = new User(
            goodValues.construct.UID,
            goodValues.construct.firstname,
            goodValues.construct.surname,
            goodValues.construct.usertype,
            goodValues.construct.username,
            goodValues.construct.password,
            goodValues.construct.email,
            goodValues.construct.cellphone
        );

		// Check if properties for startime and endtime match with constructor data.
		expect( JSON.stringify(user.toSimpleObject()) ).toEqual( JSON.stringify(
            {
                UID: goodValues.construct.UID,
                firstname: goodValues.construct.firstname,
                surname: goodValues.construct.surname,
                usertype: goodValues.construct.usertype,
                username: goodValues.construct.username,
                password: CryptoJS.SHA256(goodValues.construct.password).toString(),
                email: goodValues.construct.email,
                cellphone: goodValues.construct.cellphone
            }
        ));
	});


	it("should throw an error when created with a bad constructor UID argument", function() {
		expect(function(){
            user = new User(
                badValues.float1,
                goodValues.construct.firstname,
                goodValues.construct.surname,
                goodValues.construct.usertype,
                goodValues.construct.username,
                goodValues.construct.password,
                goodValues.construct.email,
                goodValues.construct.cellphone
            );
        }).toThrow(
            new Error("ERROR: 'UID' property must be an valid UID. (xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx)")
		);
	});

    it("should throw an error when and trying to change UID after User has been constructed.", function() {
        expect(function(){
            user = new User(
                goodValues.construct.UID,
                goodValues.construct.firstname,
                goodValues.construct.surname,
                goodValues.construct.usertype,
                goodValues.construct.username,
                goodValues.construct.password,
                goodValues.construct.email,
                goodValues.construct.cellphone

            );

            user.UID = goodValues.constructor.UID;
        }).toThrow(
            new Error("ERROR: 'UID' is already set)")
        );
    });

	it("should throw an error when created with a bad constructor firstname", function() {
		expect(function(){
            user = new User(
                goodValues.construct.UID,
                badValues.int1,
                goodValues.construct.surname,
                goodValues.construct.usertype,
                goodValues.construct.username,
                goodValues.construct.password,
                goodValues.construct.email,
                goodValues.construct.cellphone
            );
        }).toThrow(
            new Error("ERROR: firstname must be a string and at least 2 chars in length.")
        );
	});

    it("should throw an error when created with a bad constructor surname", function() {
        expect(function(){
            user = new User(
                goodValues.construct.UID,
                goodValues.construct.firstname,
                badValues.int1,
                goodValues.construct.usertype,
                goodValues.construct.username,
                goodValues.construct.password,
                goodValues.construct.email,
                goodValues.construct.cellphone
            );
        }).toThrow(
            new Error("ERROR: surname must be a string and at least 2 chars in length.")
        );
    });

    it("should throw an error when created with a bad constructor usertype", function() {
        expect(function(){
            user = new User(
                goodValues.construct.UID,
                goodValues.construct.firstname,
                goodValues.construct.surname,
                badValues.float1,
                goodValues.construct.username,
                goodValues.construct.password,
                goodValues.construct.email,
                goodValues.construct.cellphone
            );
        }).toThrow(
            new Error("ERROR: the type must be 'administrator', 'user' or 'judge'.")
        );
    });

    it("should throw an error when created with a bad constructor username", function() {
        expect(function(){
            user = new User(
                goodValues.construct.UID,
                goodValues.construct.firstname,
                goodValues.construct.surname,
                goodValues.construct.usertype,
                badValues.float1,
                goodValues.construct.password,
                goodValues.construct.email,
                goodValues.construct.cellphone
            );
        }).toThrow(
            new Error("ERROR: the username must be at least 3 chars in length.")
        );
    });

    it("should throw an error when created with a bad constructor password", function() {
        expect(function(){
            user = new User(
                goodValues.construct.UID,
                goodValues.construct.firstname,
                goodValues.construct.surname,
                goodValues.construct.usertype,
                goodValues.construct.username,
                badValues.int3,
                goodValues.construct.email,
                goodValues.construct.cellphone
            );
        }).toThrow(
            new Error("ERROR: the password must be at least 5 chars in length.")
        );
    });

    it("should throw an error when created with a bad constructor email", function() {
        expect(function(){
            user = new User(
                goodValues.construct.UID,
                goodValues.construct.firstname,
                goodValues.construct.surname,
                goodValues.construct.usertype,
                goodValues.construct.username,
                goodValues.construct.password,
                badValues.string3,
                goodValues.construct.cellphone
            );
        }).toThrow(
            new Error("ERROR: e-mail address did not validate.")
        );
    });

    it("should throw an error when created with a bad constructor cellphone", function() {
        expect(function(){
            user = new User(
                goodValues.construct.UID,
                goodValues.construct.firstname,
                goodValues.construct.surname,
                goodValues.construct.usertype,
                goodValues.construct.username,
                goodValues.construct.password,
                goodValues.construct.email,
                badValues.string2
            );
        }).toThrow(
            new Error("ERROR: cellphone number must be numeric and at least 5 chars of length.")
        );
    });

    it("should throw an error when created with a username that is already in use.", function() {
        expect(function(){

            user = new User(
                goodValues.construct.UID,
                goodValues.construct.firstname,
                goodValues.construct.surname,
                goodValues.construct.usertype,
                goodValues.construct.username,
                goodValues.construct.password,
                goodValues.construct.email,
                goodValues.construct.cellphone
            );

            user.save();

            user = new User(
                goodValues.construct.UID,
                goodValues.construct.firstname,
                goodValues.construct.surname,
                goodValues.construct.usertype,
                goodValues.construct.username,
                goodValues.construct.password,
                goodValues.construct.email,
                goodValues.construct.cellphone
            );

        }).toThrow(
            new Error("ERROR: Username is already taken.")
        );
    });

    it("should throw an error when created with a email that is already in use.", function() {
        expect(function(){

            // Clear localstorage
            localStorage.setItem('userObjArray', JSON.stringify([]));

            user = new User(
                goodValues.construct.UID,
                goodValues.construct.firstname,
                goodValues.construct.surname,
                goodValues.construct.usertype,
                goodValues.construct.username,
                goodValues.construct.password,
                goodValues.construct.email,
                goodValues.construct.cellphone
            );

            user.save();

            user = new User(
                goodValues.construct2.UID,
                goodValues.construct2.firstname,
                goodValues.construct2.surname,
                goodValues.construct2.usertype,
                goodValues.construct2.username,
                goodValues.construct2.password,
                goodValues.construct.email,
                goodValues.construct2.cellphone
            );

        }).toThrow(
            new Error("ERROR: Email address is already taken.")
        );
    });

    it("should not throw an error when trying add a user that was deleted.", function() {
        expect(function(){

            // Clear localstorage
            localStorage.setItem('userObjArray', JSON.stringify([]));

            user = new User(
                goodValues.construct.UID,
                goodValues.construct.firstname,
                goodValues.construct.surname,
                goodValues.construct.usertype,
                goodValues.construct.username,
                goodValues.construct.password,
                goodValues.construct.email,
                goodValues.construct.cellphone
            );

            user.save();
            user.removeUser();

            user = new User(
                goodValues.construct.UID,
                goodValues.construct.firstname,
                goodValues.construct.surname,
                goodValues.construct.usertype,
                goodValues.construct.username,
                goodValues.construct.password,
                goodValues.construct.email,
                goodValues.construct.cellphone
            );

        }).not.toThrow(
            new Error("ERROR: Username is already taken.")
        );
    });

    it("should have user stored i localstorage after using user.save() method.", function() {

        // Clear localstorage
        localStorage.setItem('userObjArray', JSON.stringify([]));

        user = new User(
            goodValues.construct.UID,
            goodValues.construct.firstname,
            goodValues.construct.surname,
            goodValues.construct.usertype,
            goodValues.construct.username,
            goodValues.construct.password,
            goodValues.construct.email,
            goodValues.construct.cellphone
        );

        user.save();

        expect(localStorage.getItem('userObjArray') === JSON.stringify([user.toSimpleObject()]) ).toBe(true);
    });

/*
    it("should throw an error when created with an endTime that is before startTime", function() {
        expect(function(){
            new Competition(goodValues.construct.endTime, goodValues.construct.startTime)
        }).toThrow(
            new Error("ERROR: endTime cannot be before startTime")
        );
    });
    */
});