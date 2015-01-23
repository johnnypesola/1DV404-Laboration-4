/**
 * Created by jopes on 2015-01-23.
 */

"use strict";


function Page() {

    var _competitionsArray = [],
        _addCompetitionFormElement,
        _addEventFormElement,
        _competitionContainerElement,
        _competitionSelectElement,
        _addJudgeButtonElement,
        _judgeContainerElement;

    // Properties with Getters and Setters
    Object.defineProperties(this, {
        "competitionsArray": {
            get: function(){ return _competitionsArray || ""; },

            set: function(value){
                if(value !== null && value instanceof Array){
                    _competitionsArray = value;
                } else {
                    throw new Error("ERROR: competitionsArray must be an array");
                }
            }
        },
        "addCompetitionFormElement": {
            get: function() { return _addCompetitionFormElement || "";},
            set: function(value) {
                if(value.nodeName && value.nodeName.toLowerCase() === "form") {
                    _addCompetitionFormElement = value;
                } else {
                    throw new Error("ERROR: addCompetitionFormElement must be an form element");
                }
            }
        },
        "addEventFormElement": {
            get: function() { return _addEventFormElement || "";},
            set: function(value) {
                if(value.nodeName && value.nodeName.toLowerCase() === "form") {
                    _addEventFormElement = value;
                } else {
                    throw new Error("ERROR: addEventFormElement must be an form element");
                }
            }
        },
        "competitionContainerElement": {
            get: function() { return _competitionContainerElement || "";},
            set: function(value) {
                if(value.nodeName) {
                    _competitionContainerElement = value;
                } else {
                    throw new Error("ERROR: competitionContainerElement must be an element");
                }
            }
        },
        "competitionSelectElement": {
            get: function() { return _competitionSelectElement || "";},
            set: function(value) {
                if(value.nodeName) {
                    _competitionSelectElement = value;
                } else {
                    throw new Error("ERROR: competitionSelectElement must be an element");
                }
            }
        },
        "addJudgeButtonElement": {
            get: function() { return _addJudgeButtonElement || "";},
            set: function(value) {
                if(value.nodeName) {
                    _addJudgeButtonElement = value;
                } else {
                    throw new Error("ERROR: addJudgeButtonElement must be an element");
                }
            }
        },
        "judgeContainerElement": {
            get: function() { return _judgeContainerElement || "";},
            set: function(value) {
                if(value.nodeName) {
                    _judgeContainerElement = value;
                } else {
                    throw new Error("ERROR: judgeContainerElement must be an element");
                }
            }
        }
    });

    // Init values
    this.addCompetitionFormElement = document.getElementById("addCompetitionForm");
    this.competitionContainerElement = document.getElementById("competition-container");
    this.competitionSelectElement = document.getElementById("competitions-select");

    this.addEventFormElement = document.getElementById("addEventForm");
    this.addJudgeButtonElement = document.getElementById("add-judge-button");
    this.judgeContainerElement = document.getElementById("judge-container-element");

    // Methods
    this.addCompetitionFunctionality = function () {
        var formElement,
            that = this;

        // Get element
        formElement = this.addCompetitionFormElement;

        // Add start dates
        this.addYearOptions(formElement.elements['start-year']);
        this.addMonthOptions(formElement.elements['start-month']);
        this.addDayOptions(formElement.elements['start-day']);
        this.addHourOptions(formElement.elements['start-hour']);
        this.addMinuteOptions(formElement.elements['start-minute']);


        // Add end dates
        this.addYearOptions(formElement.elements['end-year']);
        this.addMonthOptions(formElement.elements['end-month']);
        this.addDayOptions(formElement.elements['end-day']);
        this.addHourOptions(formElement.elements['end-hour']);
        this.addMinuteOptions(formElement.elements['end-minute']);

        // Add submit functionality
        formElement.elements['submit'].addEventListener("click", function (e) {
            var startDate,
                endDate;

            e.preventDefault();

            // Create date
            startDate = new Date(
                formElement.elements['start-year'].value + "-" +
                formElement.elements['start-month'].value + "-" +
                formElement.elements['start-day'].value + "T" +
                formElement.elements['start-hour'].value + ":" +
                formElement.elements['start-minute'].value + ":00"
            );

            endDate = new Date(
                formElement.elements['end-year'].value + "-" +
                formElement.elements['end-month'].value + "-" +
                formElement.elements['end-day'].value + "T" +
                formElement.elements['end-hour'].value + ":" +
                formElement.elements['end-minute'].value + ":00"
            );

            // Create new competition
            that.addCompetition(new Competition(startDate.getTime(), endDate.getTime()));

            // Render competitions
            that.renderCompetitions();

            // Show add event form
            that.addEventFormElement.classList.remove("hidden");

        });
    };

    this.renderCompetitions = function() {
        var containerElement,
            competitionContainerElement,
            startDateObj,
            endDateObj,
            competitionsSelectElement,
            optionElement;

        containerElement = this.competitionContainerElement;
        competitionsSelectElement = this.competitionSelectElement;

        containerElement.innerHTML = "";
        competitionsSelectElement.innerHTML = "";

        this.competitionsArray.forEach(function (competitionObj, index) {

            startDateObj = new Date(competitionObj.startTime);
            endDateObj = new Date(competitionObj.endTime);

            // Competition text list
            competitionContainerElement = document.createElement("div");

            competitionContainerElement.innerHTML = startDateObj.toCustomString() + " &#8594; " + endDateObj.toCustomString();

            containerElement.appendChild(competitionContainerElement);

            // Competition Select element
            optionElement = document.createElement("option");

            optionElement.value = index;

            optionElement.innerHTML = startDateObj.toCustomString() + " &#8594; " + endDateObj.toCustomString();

            competitionsSelectElement.appendChild(optionElement);

        });
    };

    this.addCompetition = function(competitionObj) {
        this.competitionsArray.push(competitionObj);
    };

    this.addEventFunctionality = function () {
        var formElement,
            that = this;

        // Get element
        formElement = this.addEventFormElement;

        // Add judgebutton functionality
        that.addJudgeButtonFunctionality();

        // Add start dates
        this.addYearOptions(formElement.elements['start-year']);
        this.addMonthOptions(formElement.elements['start-month']);
        this.addDayOptions(formElement.elements['start-day']);
        this.addHourOptions(formElement.elements['start-hour']);
        this.addMinuteOptions(formElement.elements['start-minute']);


        // Add end dates
        this.addYearOptions(formElement.elements['end-year']);
        this.addMonthOptions(formElement.elements['end-month']);
        this.addDayOptions(formElement.elements['end-day']);
        this.addHourOptions(formElement.elements['end-hour']);
        this.addMinuteOptions(formElement.elements['end-minute']);

        // Add submit functionality
        formElement.elements['submit'].addEventListener("click", function (e) {
            var startDate,
                endDate,
                eventObj,
                i,
                judgesArray = [];

            e.preventDefault();

            // Create date
            startDate = new Date(
                formElement.elements['start-year'].value + "-" +
                formElement.elements['start-month'].value + "-" +
                formElement.elements['start-day'].value + "T" +
                formElement.elements['start-hour'].value + ":" +
                formElement.elements['start-minute'].value + ":00"
            );

            endDate = new Date(
                formElement.elements['end-year'].value + "-" +
                formElement.elements['end-month'].value + "-" +
                formElement.elements['end-day'].value + "T" +
                formElement.elements['end-hour'].value + ":" +
                formElement.elements['end-minute'].value + ":00"
            );

            // Check that all input is corrent
            that.checkAddEventFormInput(formElement);

            // Parse Judges array
            if(formElement.elements['judge-name'].length) {
                for (i = 0; i < formElement.elements['judge-name'].length; i++) {

                    judgesArray.push ({
                        name: formElement.elements['judge-name'][i].value,
                        email: formElement.elements['judge-email'][i].value,
                        sms: formElement.elements['judge-cellphone'][i].value
                    });
                }
            } else {
                judgesArray.push ({
                    name: formElement.elements['judge-name'].value,
                    email: formElement.elements['judge-email'].value,
                    sms: formElement.elements['judge-cellphone'].value
                });
            }

            // Create new Event object
            eventObj = new Event(
                startDate.getTime(),
                endDate.getTime(),
                formElement.elements['gymnastics-type'].value,
                formElement.elements['participants-type'].value,
                formElement.elements['participants-gender'].value,
                (formElement.elements['is-individual'].value === "true"),
                (formElement.elements['is-allround'].value === "true"),
                judgesArray
            );

            // Create new event in competition
            //that.competitionsArray.push(new Competition(startDate.getTime(), endDate.getTime()));

            // Render competitions
            //that.renderCompetitions();

        });
    };

    this.checkAddEventFormInput = function (formElement) {

        // Check gymnastics type
        if (formElement.elements['gymnastics-type'].value === "") {
            alert("Var god ange tävlingsgren");
            formElement.elements['gymnastics-type'].focus();
        }
    };

    this.addJudgeButtonFunctionality = function (){
        var that = this,
            containerElement,
            judgeNameInput,
            judgeEmailInput,
            judgeCellPhoneInput,
            textNode;

        this.addJudgeButtonElement.addEventListener("click", function(e) {
            e.preventDefault();

            // Create elements
            containerElement = document.createElement("div");
            judgeNameInput = document.createElement("input");
            judgeNameInput.setAttribute("name", "judge-name");
            judgeEmailInput = document.createElement("input");
            judgeEmailInput.setAttribute("name", "judge-email");
            judgeCellPhoneInput = document.createElement("input");
            judgeCellPhoneInput.setAttribute("name", "judge-cellphone");

            // Name
            textNode = document.createTextNode("Namn: ");
            containerElement.appendChild(textNode);
            containerElement.appendChild(judgeNameInput);
            containerElement.appendChild(document.createElement("br"));

            // Email
            textNode = document.createTextNode(" E-post: ");
            containerElement.appendChild(textNode);
            containerElement.appendChild(judgeEmailInput);
            containerElement.appendChild(document.createElement("br"));

            // Cellphone
            textNode = document.createTextNode(" Mobilnr: ");
            containerElement.appendChild(textNode);
            containerElement.appendChild(judgeCellPhoneInput);
            containerElement.appendChild(document.createElement("br"));

            // Add fields for judge info input
            that.judgeContainerElement.appendChild(containerElement);
        })
    };

    this.addYearOptions = function(selectElement) {
        var i,
            optionElement,
            date = new Date();

        // Create elements
        for (i = date.getFullYear(); i < date.getFullYear() + 10; i++) {
            optionElement = document.createElement("option");

            optionElement.setAttribute("value", i);
            optionElement.innerHTML = i;

            selectElement.appendChild(optionElement);
        }
    };

    this.addMonthOptions = function (selectElement) {
        var i,
            optionElement;

        // Create elements
        for (i = 1; i <= 12; i++) {
            optionElement = document.createElement("option");

            optionElement.setAttribute("value", ("0" + i).slice(-2));
            optionElement.innerHTML = ("0" + i).slice(-2);

            selectElement.appendChild(optionElement);
        }
    };

    this.addDayOptions = function (selectElement) {
        var i,
            optionElement;

        // Create elements
        for (i = 1; i <= 31; i++) {
            optionElement = document.createElement("option");

            optionElement.setAttribute("value", ("0" + i).slice(-2));
            optionElement.innerHTML = ("0" + i).slice(-2);

            selectElement.appendChild(optionElement)
        }
    };

    this.addHourOptions = function (selectElement) {
        var i,
            optionElement;

        // Create elements
        for (i = 0; i <= 23; i++) {
            optionElement = document.createElement("option");

            optionElement.setAttribute("value", ("0" + i).slice(-2));
            optionElement.innerHTML = ("0" + i).slice(-2);

            selectElement.appendChild(optionElement)
        }
    };

    this.addMinuteOptions = function (selectElement) {
        var i,
            optionElement;

        // Create elements
        for (i = 0; i <= 59; i++) {
            optionElement = document.createElement("option");

            optionElement.setAttribute("value", ("0" + i).slice(-2));
            optionElement.innerHTML = ("0" + i).slice(-2);

            selectElement.appendChild(optionElement)
        }
    };
}