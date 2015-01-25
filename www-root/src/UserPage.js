/**
 * Created by jopes on 2015-01-24.
 */

"use strict";

    var UserPage = function() {



        var _userObjArray = [],
            _addUserFormElement,
            _editUserFormElement,
            _userContainerElement,
            _typeSelectElement;


        // Properties with Getters and Setters
        Object.defineProperties(this, {
            "userObjArray": {
                get: function () {
                    return _userObjArray || "";
                },

                set: function (value) {
                    if (value !== null && value instanceof Array) {

                        _userObjArray = value;
                    } else {

                        throw new Error("ERROR: userObjArray must be an array");
                    }
                }
            },
            "addUserFormElement": {
                get: function () {
                    return _addUserFormElement || "";
                },
                set: function (value) {
                    if (value.nodeName && value.nodeName.toLowerCase() === "form") {
                        _addUserFormElement = value;
                    } else {
                        throw new Error("ERROR: addUserFormElement must be an form element");
                    }
                }
            },
            "editUserFormElement": {
                get: function () {
                    return _editUserFormElement || "";
                },
                set: function (value) {
                    if (value.nodeName && value.nodeName.toLowerCase() === "form") {
                        _editUserFormElement = value;
                    } else {
                        throw new Error("ERROR: editUserFormElement must be an form element");
                    }
                }
            },
            "userContainerElement": {
                get: function () {
                    return _userContainerElement || "";
                },
                set: function (value) {
                    if (value.nodeName) {
                        _userContainerElement = value;
                    } else {
                        throw new Error("ERROR: userContainerElement must be an element");
                    }
                }
            },
            "typeSelectElement": {
                get: function () {
                    return _typeSelectElement || "";
                },
                set: function (value) {
                    if (value.nodeName) {
                        _typeSelectElement = value;
                    } else {
                        throw new Error("ERROR: typeSelectElement must be an element");
                    }
                }
            }
        });

        // Init values, create elements, if the do not exists. This allows jasmine tests to run.
        this.addUserFormElement = document.getElementById("addUserForm") || document.createElement("form");
        this.editUserFormElement = document.getElementById("editUserForm") || document.createElement("form");
        this.userContainerElement = document.getElementById("user-container") || document.createElement("div");
        this.typeSelectElement = document.getElementById("type-select") || document.createElement("select");


        this.userObjArray = (!localStorage.getItem('userObjArray') || localStorage.getItem('userObjArray') && localStorage.getItem('userObjArray').length == 0 ? [] : JSON.parse(localStorage.getItem('userObjArray')));

    };

    // Methods


    UserPage.prototype = {
        constructor: UserPage,


        addUserFunctionality: function () {
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
//                try {
                    that.addUser(new User(
                        that.generateUID(),
                        formElement.elements['firstname'].value,
                        formElement.elements['surname'].value,
                        formElement.elements['usertype'].value,
                        formElement.elements['username'].value,
                        formElement.elements['password'].value,
                        formElement.elements['email'].value,
                        formElement.elements['cellphone'].value
                    ));
/*                } catch (error) {
                    alert(error);
                    return false;
                }
*/
                // Render competitions
                that.renderUsers();

            });
        },

        renderUsers: function() {

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

        },

        removeUser: function(userObj, noVisualUpdate) {

            var userObjArray,
                i;

            // Check if localstorage is defined
            if (!localStorage.getItem('userObjArray')) {
                return false;
            }

            // Find user object and remove it from array.
            for(i = 0; i < this.userObjArray.length; i++) {
                if(JSON.stringify(userObj) === JSON.stringify(this.userObjArray[i])){
                    this.userObjArray.splice(i, 1);
                    break;
                }
            }

            // Save modified array in localstorage
            localStorage.setItem('userObjArray', JSON.stringify(this.userObjArray));


            if(!noVisualUpdate) {
                // Update users list
                this.renderUsers();

                // Hide edit user box
                this.editUserFormElement.classList.add("hidden");
            }
        },

        renderEditUser: function(index) {
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

            // Clear old content
            this.editUserFormElement.innerHTML = "";

            // Create input elements
            firstnameInput = document.createElement("input");
            surnameInput = document.createElement("input");
            usernameInput = document.createElement("input");
            passwordInput = document.createElement("input");
            emailInput = document.createElement("input");
            cellphoneInput = document.createElement("input");

            // Set types
            firstnameInput.setAttribute("type", "text");
            surnameInput.setAttribute("type", "text");
            usernameInput.setAttribute("type", "text");
            passwordInput.setAttribute("type", "password");
            emailInput.setAttribute("type", "text");
            cellphoneInput.setAttribute("type", "text");

            // Add values
            firstnameInput.value = userObj.firstname;
            surnameInput.value = userObj.surname;
            usernameInput.value = userObj.username;
            emailInput.value = userObj.email;
            cellphoneInput.value = userObj.cellphone;

            // Create select with options
            typeSelect = document.createElement("select");

            typeSelect.innerHTML = '' +
            '<option value="user">Användare</option>' +
            '<option value="judge">Domare</option>' +
            '<option value="administrator">Administratör</option>';

            // Set selected option
            switch (this.userObjArray[index].usertype) {
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
            deleteUserElement.classList.add("left");

            // Build content
            this.editUserFormElement.appendChild(document.createTextNode("Användartyp: "));
            this.editUserFormElement.appendChild(typeSelect);
            this.editUserFormElement.appendChild(document.createElement("br"));

            this.editUserFormElement.appendChild(document.createTextNode("Förnamn: "));
            this.editUserFormElement.appendChild(firstnameInput);
            this.editUserFormElement.appendChild(document.createElement("br"));

            this.editUserFormElement.appendChild(document.createTextNode("Efternamn: "));
            this.editUserFormElement.appendChild(surnameInput);
            this.editUserFormElement.appendChild(document.createElement("br"));
            this.editUserFormElement.appendChild(document.createElement("br"));

            this.editUserFormElement.appendChild(document.createTextNode("Användarnamn: "));
            this.editUserFormElement.appendChild(usernameInput);
            this.editUserFormElement.appendChild(document.createElement("br"));

            this.editUserFormElement.appendChild(document.createTextNode("Nytt lösenord: "));
            this.editUserFormElement.appendChild(passwordInput);
            this.editUserFormElement.appendChild(document.createElement("br"));
            this.editUserFormElement.appendChild(document.createElement("br"));

            this.editUserFormElement.appendChild(document.createTextNode("E-postadress: "));
            this.editUserFormElement.appendChild(emailInput);
            this.editUserFormElement.appendChild(document.createElement("br"));

            this.editUserFormElement.appendChild(document.createTextNode("Mobiltelefonnummer: "));
            this.editUserFormElement.appendChild(cellphoneInput);
            this.editUserFormElement.appendChild(document.createElement("br"));


            this.editUserFormElement.appendChild(submitElement);
            this.editUserFormElement.appendChild(deleteUserElement);

            // Show edit user content.
            this.editUserFormElement.classList.remove("hidden");

            // User is deleted on click
            deleteUserElement.addEventListener("click", function(e) {
                e.preventDefault();

                if (confirm("Vill du verkligen ta bort denna användare?")) {

                    that.removeUser(that.userObjArray[index]);
                }
            });

            // User information is saved on click.
            submitElement.addEventListener("click", function(e) {
                e.preventDefault();

                // Update information
                that.userObjArray[index].firstname = firstnameInput.value;
                that.userObjArray[index].surname = surnameInput.value;
                that.userObjArray[index].usertype = typeSelect.value;
                that.userObjArray[index].username = usernameInput.value;
                that.userObjArray[index].email = emailInput.value;
                that.userObjArray[index].cellphone = cellphoneInput.value;

                if(passwordInput.value.length > 1) {
                    that.userObjArray[index].password = passwordInput.value;
                }

                // Save new user info
                that.saveUsers();

                // Render users
                that.renderUsers();

                // Hide edit user box
                that.editUserFormElement.classList.add("hidden");
            });
        },

        getUserByUID: function(targetUID) {
            var returnValue = false,
                i;

            for (i = 0; i < this.userObjArray.length; i++) {
                if (this.userObjArray[i].UID === targetUID) {
                    returnValue = this.userObjArray[i];
                    break;
                }
            }

            return returnValue;
        },

        getUsersUpdate: function() {
            var userObjArray;

            userObjArray = JSON.parse(localStorage.getItem('userObjArray'));

            if(!(userObjArray instanceof Array)) {
                this.userObjArray = [];
            } else {
                this.userObjArray = userObjArray;
            }
        },

        saveUsers: function() {
            localStorage.setItem('userObjArray', JSON.stringify(this.userObjArray));
        },

        addUser: function(userObj) {
            try {
                userObj.save();
            } catch(error) {
                alert(error);
            }

            this.getUsersUpdate();
        },

        generateUID: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
            });
        }
};