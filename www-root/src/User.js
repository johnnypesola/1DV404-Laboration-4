"use strict";

function User (firstname, surname, type, username, password, email, cellphone){

    var _firstname,
        _surname,
        _type,
        _username,
        _password,
        _email,
        _cellphone;

    // Properties with Getters and Setters
    Object.defineProperties(this, {
        "firstname": {
            get: function(){ return _firstname || ""; },

            set: function(value){
                if(value.length >= 2){

                    _firstname = value;

                } else{
                    throw new Error("ERROR: the firstname must be at least 2 chars in length.");
                }
            }
        },
        "surname": {
            get: function(){ return _surname || ""; },

            set: function(value){
                if(value.length >= 2){

                    _surname = value;

                } else{
                    throw new Error("ERROR: the surname must be at least 2 chars in length.");
                }
            }
        },
        "type": {
            get: function(){ return _type || ""; },

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

                _type = value;
            }
        },
        "username": {
            get: function(){ return _username || ""; },

            set: function(value){
                if(value.length >= 3){

                    // Check if username is allready taken.
                    if(this.isUsernameTaken(value)) {
                        throw Error("ERROR: Username is allready taken.");
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
                        throw Error("ERROR: Email address is allready taken.");
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
    this.firstname = firstname || "";
    this.surname = surname || "";
    this.type = type || "";
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

    remove: function() {
        var userObjArray,
            that = this;

        // Check if localstorage is defined
        if (!localStorage.getItem('userObjArray')) {
            return false;
        }

        userObjArray = JSON.parse(localStorage.getItem('userObjArray'));

        userObjArray.forEach(function(userObj, index) {
            if (JSON.stringify(that.toSimpleObject) === JSON.stringify(userObj)) {
                
            }
        });
    },

    save: function () {
        var userObjArray;

        // Set userarray in localstorage if its not defined.
        if(!localStorage.getItem('userObjArray')) {
            localStorage.setItem('userObjArray', JSON.stringify([]));
        }

        // Get userarray for localstorage
        userObjArray = JSON.parse(localStorage.getItem('userObjArray'));

        // Check if username is allready taken.
        if(this.isUsernameTaken(this.username)) {
            throw Error("ERROR: Username is allready taken.");
        }

        // Save in localstorage
        localStorage.setItem('userObjArray', JSON.stringify(this.toSimpleObject()));
    },

    toSimpleObject: function() {
        return {
            firstname: this.firstname,
            surname: this.surname,
            username: this.username,
            password: this.password,
            email: this.email,
            cellphone: this.cellphone
        };
    }



};