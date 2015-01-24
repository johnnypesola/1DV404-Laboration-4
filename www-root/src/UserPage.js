/**
 * Created by jopes on 2015-01-24.
 */

"use strict";


window.onload = function(){

    var pageObj = new UserPage();

    pageObj.renderUsers();
    pageObj.addUserFunctionality();

};


function UserPage() {

    var _userObjArray = [],
        _addUserFormElement,
        _editUserFormElement,
        _userContainerElement,
        _typeSelectElement;

    // Properties with Getters and Setters
    Object.defineProperties(this, {
        "userObjArray": {
            get: function(){ return _userObjArray || ""; },

            set: function(value){
                if(value !== null && value instanceof Array){
                    _userObjArray = value;
                } else {
                    throw new Error("ERROR: userObjArray must be an array");
                }
            }
        },
        "addUserFormElement": {
            get: function() { return _addUserFormElement || "";},
            set: function(value) {
                if(value.nodeName && value.nodeName.toLowerCase() === "form") {
                    _addUserFormElement = value;
                } else {
                    throw new Error("ERROR: addUserFormElement must be an form element");
                }
            }
        },
        "editUserFormElement": {
            get: function() { return _editUserFormElement || "";},
            set: function(value) {
                if(value.nodeName && value.nodeName.toLowerCase() === "form") {
                    _editUserFormElement = value;
                } else {
                    throw new Error("ERROR: editUserFormElement must be an form element");
                }
            }
        },

        "userContainerElement": {
            get: function() { return _userContainerElement || "";},
            set: function(value) {
                if(value.nodeName) {
                    _userContainerElement = value;
                } else {
                    throw new Error("ERROR: userContainerElement must be an element");
                }
            }
        },
        "typeSelectElement": {
            get: function() { return _typeSelectElement || "";},
            set: function(value) {
                if(value.nodeName) {
                    _typeSelectElement = value;
                } else {
                    throw new Error("ERROR: typeSelectElement must be an element");
                }
            }
        }
    });

    // Init values, create elements, if the do not exists. This allows jasmine tests to run.
    this.addUserFormElement = document.getElementById("addUserForm") || document.createElement("form");
    this.editUserFormElement =  document.getElementById("editUserForm") || document.createElement("form");
    this.userContainerElement = document.getElementById("user-container") || document.createElement("div");
    this.typeSelectElement = document.getElementById("type-select") || document.createElement("select");
    this.userObjArray = JSON.parse(localStorage.getItem('userObjArray'));


    // Methods
    this.addUserFunctionality = function () {
        var formElement,
            that = this;

        // Get element
        formElement = this.addUserFormElement;

        // Add submit functionality
        formElement.elements['submit'].addEventListener("click", function (e) {
            var startDate,
                endDate;

            e.preventDefault();

            // Create new user
            try {
                that.addUser(new User(
                    formElement.elements['firstname'].value,
                    formElement.elements['surname'].value,
                    formElement.elements['type'].value,
                    formElement.elements['username'].value,
                    formElement.elements['password'].value,
                    formElement.elements['email'].value,
                    formElement.elements['cellphone'].value
                ));
            } catch (error) {
                alert(error);
                return false;
            }

            // Render competitions
            that.renderUsers();

        });
    };

    this.renderUsers = function() {

        var containerElement,
            userContainerElement,
            that = this;

        containerElement = this.userContainerElement;

        containerElement.innerHTML = "";

        this.userObjArray.forEach(function (userObj, index) {

            // User text list
            userContainerElement = document.createElement("a");
            userContainerElement.setAttribute("href", "#");
            userContainerElement.addEventListener("click", function(e){

                // Prevent follow anchor link, going to top of page,
                e.preventDefault();

                // Render user on click, able to edit user
                that.renderEditUser(index);
            });

            userContainerElement.innerHTML = userObj.username + " (" + userObj.firstname + " " + userObj.surname + ")";

            containerElement.appendChild(userContainerElement);

        });

    };

    this.deleteUser = function(index) {

    };

    this.renderEditUser = function(index) {
        var userObj,
            submitElement,
            deleteUserElement,
            firstnameInput,
            surnameInput,
            typeSelect,
            typeOption,
            usernameInput,
            passwordInput,
            emailInput,
            cellphoneInput,
            that = this;

        userObj = this.userObjArray[index];

        this.editUserFormElement;

        // Create input elements
        firstnameInput = document.createElement("input");
        surnameInput = document.createElement("input");
        usernameInput = document.createElement("input");
        passwordInput = document.createElement("input");
        emailInput = document.createElement("input");
        cellphoneInput = document.createElement("input");

        // Create select with options
        typeSelect = document.createElement("select");

        typeSelect.innerHTML = '' +
        '<option value="user">Användare</option>' +
        '<option value="judge">Domare</option>' +
        '<option value="administrator">Administratör</option>';

        // Set selected option
        switch (this.userObjArray[index].type) {
            case "user":
                typeSelect.selectedIndex = 0;
                break;
            case "judge":
                typeSelect.selectedIndex = 1;
                break;
            case "administrator":
                typeSelect.selectedIndex = 2;
                break;
            default:
                typeSelect.selectedIndex = 0;
        }

        // Submit new info button
        submitElement = document.createElement("button");
        submitElement.innerHTML = "Spara uppgifter";

        // Delete user button
        deleteUserElement = document.createElement("button");
        deleteUserElement.innerHTML = "Ta bort användaren";

        // Build content
        this.editUserFormElement.appendChild(document.createTextNode("Förnamn"));

        // User is deleted on click
        deleteUserElement.addEventListener("click", function(e) {
            e.preventDefault();

            if (confirm("Vill du verkligen ta denna användare?")) {
                that.userObjArray[index].remove();
            }
        });

        // User information is saved on click.
        submitElement.addEventListener("click", function(e) {
            e.preventDefault();

            // Remove old user
            that.userObjArray[index].remove();

            // Create new user
            try {
                that.addUser(new User(
                    firstnameInput.value,
                    surnameInput.value,
                    typeSelect.value,
                    usernameInput.value,
                    passwordInput.value,
                    emailInput.value,
                    cellphoneInput.value
                ));
            } catch (error) {
                alert(error);
                return false;
            }

            // Render competitions
            that.renderUsers();
        });



    };

    this.getUsersUpdate = function() {
        this.userObjArray = JSON.parse(localStorage.getItem('userObjArray'));
    };

    this.addUser = function(userObj) {
        try {
            userObj.save();
        } catch(error) {
            alert(error);
        }

        this.getUsersUpdate();
    };
}