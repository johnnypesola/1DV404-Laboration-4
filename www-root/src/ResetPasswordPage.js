/**
 * Created by jopes on 2015-01-25.
 */

"use strict";

var ResetPasswordPage = function() {



    var _requestResetPasswordFormElement,
        _editUserFormElement,
        _userContainerElement,
        _typeSelectElement;


    // Properties with Getters and Setters
    Object.defineProperties(this, {
        "requestResetPasswordFormElement": {
            get: function () {
                return _requestResetPasswordFormElement || "";
            },
            set: function (value) {
                if (value.nodeName && value.nodeName.toLowerCase() === "form") {
                    _requestResetPasswordFormElement = value;
                } else {
                    throw new Error("ERROR: requestResetPasswordFormElement must be an form element");
                }
            }
        }
    });

    // Init values, create elements, if the do not exists. This allows jasmine tests to run.
    this.requestResetPasswordFormElement = document.getElementById("requestResetPasswordForm") || document.createElement("form");

};

// Methods


ResetPasswordPage.prototype = {
    constructor: ResetPasswordPage,


    addRequestResetPasswordFunctionality: function () {
        var formElement,
            that = this;

        // Define localstorage if its not defined.
        if(!localStorage.getItem('userObjArray')) {
            localStorage.setItem('userObjArray', JSON.stringify([]));
        }

        // Get element
        formElement = this.requestResetPasswordFormElement;


        // Add submit functionality
        formElement.elements['submit'].addEventListener("click", function (e) {
            var userObjArray,
                affectedUser;

            e.preventDefault();


            if(formElement.elements['captcha'].value.toLowerCase() !== "blå") {
                alert("ERROR: Not correct value for Captcha.");
                return false;
            }

            userObjArray = JSON.parse(localStorage.getItem('userObjArray'));

            if(!(userObjArray.some(function(userObj) {
                if(
                    userObj.email === formElement.elements['email-or-cellphone'].value ||
                    userObj.cellphone === formElement.elements['email-or-cellphone'].value
                ) {
                    affectedUser = userObj;

                    return true;
                }
            }))) {
                alert("ERROR: Could not find user with specified email address or cellphone number");
                return false;
            }

            // Send Email or sms
            if(affectedUser.email) {
                if(User.prototype.sendEmail(affectedUser.email)) {
                    that.renderConfirmationSent("email");
                } else {
                    alert("ERROR: No e-mail could be sent.");
                }
            } else if(affectedUser.cellphone) {
                if(User.prototype.sendSms(affectedUser.cellphone)) {
                    that.renderConfirmationSent("cellphone");
                } else {
                    alert("ERROR: No sms or e-mail could be sent.");
                }
            }
        });
    },

    renderConfirmationSent: function(emailOrCellphone) {

        var containerElement,
            userContainerElement,
            that = this;

        this.requestResetPasswordFormElement.innerHTML = "<h2>Återställningslänk skickad genom " + (emailOrCellphone === "email" ? "E-post" : "Sms") + "</h2>";

    }
};