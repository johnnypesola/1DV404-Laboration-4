"use strict";

function User (UID, firstname, surname, usertype, username, password, email, cellphone){

    var _UID,
        _firstname,
        _surname,
        _usertype,
        _username,
        _password,
        _email,
        _cellphone;

    // Properties with Getters and Setters
    Object.defineProperties(this, {
        "UID": {
            get: function () { return _UID || ""; },

            set: function (value) {
                if (this.UID !== "") {
                    throw new Error("ERROR: 'UID' is already set)");
                }

                if (value.match(/[0-9a-zA-Z]{8}\-[0-9a-zA-Z]{4}\-[0-9a-zA-Z]{4}\-[0-9a-zA-Z]{4}\-[0-9a-zA-Z]{12}/) === null) {
                    throw new Error("ERROR: 'UID' property must be an valid UID. (xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx)");
                }

                _UID = value;
            }
        },
        "firstname": {
            get: function(){ return _firstname || ""; },

            set: function(value){
                if(value.length >= 2){

                    _firstname = value;

                } else{
                    throw new Error("ERROR: firstname must be a string and at least 2 chars in length.");
                }
            }
        },
        "surname": {
            get: function(){ return _surname || ""; },

            set: function(value){
                if(value.length >= 2){

                    _surname = value;

                } else{
                    throw new Error("ERROR: surname must be a string and at least 2 chars in length.");
                }
            }
        },
        "usertype": {
            get: function(){ return _usertype || ""; },

            set: function(value){

                switch(value) {
                    case "administrator":
                        break;
                    case "user":
                        break;
                    case "judge":
                        break;
                    default:
                        throw new Error("ERROR: the type must be 'administrator', 'user' or 'judge'.");
                }

                _usertype = value;
            }
        },
        "username": {
            get: function(){ return _username || ""; },

            set: function(value){
                if(value.length >= 3){

                    // Check if username is allready taken.
                    if(this.isUsernameTaken(value)) {
                        throw Error("ERROR: Username is already taken.");
                    }

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

                    _password = this.encryptString(value);

                } else{
                    throw new Error("ERROR: the password must be at least 5 chars in length.");
                }
            }
        },
        "email": {
            get: function(){ return _email || ""; },

            set: function(value){
                if(value.length > 4 && validateEmail(value)){

                    // Check if username is allready taken.
                    if(this.isEmailTaken(value)) {
                        throw Error("ERROR: Email address is already taken.");
                    }

                    _email = value;
                } else {

                    throw new Error("ERROR: e-mail address did not validate.");
                }
            }
        },
        "cellphone": {
            get: function(){ return _cellphone || ""; },

            set: function(value){
                if(value.length > 4 && isNumeric(value)){
                    _cellphone = value;
                } else {
                    throw new Error("ERROR: cellphone number must be numeric and at least 5 chars of length.");
                }
            }
        }
    });

    // Assign default values to object
    this.UID = UID;
    this.firstname = firstname || "";
    this.surname = surname || "";
    this.usertype = usertype || "";
    this.username = username || "" ;
    this.password = password || "";
    this.email = email || "";
    this.cellphone = cellphone || "";
}

User.prototype = {

    constructor: User,

    encryptString: function(string){
        return CryptoJS.SHA256(string);
    },

    isUsernameTaken: function(username) {
        var userObjArray;

        if (localStorage.getItem('userObjArray')) {

            // Get userarray for localstorage
            userObjArray = JSON.parse(localStorage.getItem('userObjArray'));

            if(!(userObjArray instanceof Array)) {
                return false;
            }

            return userObjArray.some(function(userObj) {
                return userObj.username === username;
            });
        } else {
            return false;
        }
    },

    isEmailTaken: function(email) {
        var userObjArray;

        if (localStorage.getItem('userObjArray')) {

            // Get userarray for localstorage
            userObjArray = JSON.parse(localStorage.getItem('userObjArray'));

            if(!(userObjArray instanceof Array)) {
                return false;
            }

            return userObjArray.some(function(userObj) {
                return userObj.email === email;
            });
        } else {
            return false;
        }
    },

    sendEmail: function() {
        if(this.email !== "") {
            // Not implemented
        } else {
            throw Error("ERROR: cannot send email to user; no e-mail address defined.");
        }
    },

    sendSms: function() {
        if(this.cellphone !== "") {
            // Not implemented
        } else {
            throw Error("ERROR: cannot send sms to user; no cellphone number defined.");
        }
    },

    removeUser: function() {
        var userObjArray,
            i,
            that = this;



        // Check if localstorage is defined
        if (!localStorage.getItem('userObjArray')) {
            return false;
        }

        // Get user object array from localstorage
        userObjArray = JSON.parse(localStorage.getItem('userObjArray'));


        // Find user object and remove it from array.
        for(i = 0; i < userObjArray.length; i++) {

            //console.log(JSON.stringify(that.toSimpleObject()) + "\n" + JSON.stringify(userObjArray[i]));

            if(JSON.stringify(that.toSimpleObject) === JSON.stringify(userObjArray[i])){
                userObjArray.splice(index, 1);
                break;
            }
        }

        // Save modified array in localstorage
        localStorage.setItem('userObjArray', JSON.stringify(userObjArray));
    },

    save: function () {
        var userObjArray;

        // Set array in localstorage if its not defined.
        if(!localStorage.getItem('userObjArray')) {
            localStorage.setItem('userObjArray', JSON.stringify([]));
        }

        // Get userarray from localstorage
        userObjArray = JSON.parse(localStorage.getItem('userObjArray'));

        // Reset local storage if it does not contain an array
        if(!(userObjArray instanceof Array)) {
            localStorage.setItem('userObjArray', []);
        }

        // Check if username is allready taken.
        if(this.isUsernameTaken(this.username)) {
            throw Error("ERROR: Username is allready taken.");
        }


        userObjArray.push(this.toSimpleObject());

        // Save in localstorage
        localStorage.setItem('userObjArray', JSON.stringify(userObjArray));
    },

    toSimpleObject: function() {
        return {
            UID: this.UID,
            firstname: this.firstname,
            surname: this.surname,
            usertype: this.usertype,
            username: this.username,
            password: this.password,
            email: this.email,
            cellphone: this.cellphone
        };
    }

};