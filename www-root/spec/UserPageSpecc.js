describe("UserPage", function() {
    var user, userPage, goodValues, badValues;

    // Load fixtures
    goodValues = getJSONFixture('user_page_values.json');
    badValues = getJSONFixture('bad_values.json');

    // Clear localstorage
    localStorage.setItem('userObjArray', JSON.stringify([]));


    it("should store user object after UserPage.addUser() method.", function() {


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

        userPage = new UserPage();

        userPage.addUser(user);

/*        console.log(JSON.stringify(userPage.userObjArray[0]));
        console.log([JSON.stringify( user.toSimpleObject())]);
        console.log(localStorage.getItem('userObjArray'));
*/
        expect( JSON.stringify(userPage.userObjArray[0]) ).toEqual( JSON.stringify( user.toSimpleObject()));
        expect( localStorage.getItem('userObjArray') ).toEqual( JSON.stringify( [user.toSimpleObject()]));
    });


    it("should store array of user objects after UserPage.saveUsers() method.", function() {


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

        userPage = new UserPage();

        userPage.userObjArray = [user.toSimpleObject()];

        userPage.saveUsers();

        expect( localStorage.getItem('userObjArray') ).toEqual( JSON.stringify( userPage.userObjArray));
    });


    it("should fetch array of user objects after UserPage.getUsersUpdate() method.", function() {

        localStorage.setItem('userObjArray', JSON.stringify([goodValues.construct]));

        userPage = new UserPage();

        userPage.getUsersUpdate();

        expect( localStorage.getItem('userObjArray') ).toEqual( JSON.stringify( userPage.userObjArray));
    });

    it("should return the right user object after UserPage.getUserById(UID) method.", function() {

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

        userPage = new UserPage();

        userPage.userObjArray = [user.toSimpleObject()];

        expect( JSON.stringify( userPage.getUserByUID(goodValues.construct.UID) ) ).toEqual( JSON.stringify( user.toSimpleObject() ));
    });

    it("should remove the user object from both localstorage and userPage.userObjArray after running UserPage.removeUser(userObj, true) method.", function() {

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

        userPage = new UserPage();

        userPage.userObjArray = [user.toSimpleObject()];

        userPage.removeUser(user.toSimpleObject(), true);

        expect( JSON.stringify(userPage.userObjArray[0]) ).not.toEqual( JSON.stringify( user.toSimpleObject() ));
        expect( localStorage.getItem("userObjArray") ).not.toEqual( JSON.stringify( user.toSimpleObject() ));
    });

});