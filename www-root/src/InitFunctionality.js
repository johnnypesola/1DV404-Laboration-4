"use strict";

        // Functions

        function addCompetitionFunctionality() {
            var formElement,
                competitionsArray = [];

            formElement = document.getElementById("addCompetitionForm");

            // Add start dates
            addYearOptions(formElement.elements['start-year']);
            addMonthOptions(formElement.elements['start-month']);
            addDayOptions(formElement.elements['start-day']);
            addHourOptions(formElement.elements['start-hour']);
            addMinuteOptions(formElement.elements['start-minute']);


            // Add end dates
            addYearOptions(formElement.elements['end-year']);
            addMonthOptions(formElement.elements['end-month']);
            addDayOptions(formElement.elements['end-day']);
            addHourOptions(formElement.elements['end-hour']);
            addMinuteOptions(formElement.elements['end-minute']);

            formElement.elements['submit'].addEventListener("click", function(e) {
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
                competitionsArray.push(new Competition(startDate.getTime(), endDate.getTime()));

                // Render competitions
                renderCompetitions(competitionsArray);

            });
        }


    function renderCompetitions (competitionsArray) {
        var containerElement,
            competitionContainerElement,
            startDateObj,
            endDateObj,
            competitionsSelectElement,
            optionElement;

        containerElement = document.getElementById("competition-container");
        competitionsSelectElement = document.getElementById("competitions-select");

        containerElement.innerHTML = "";
        competitionsSelectElement.innerHTML = "";

        competitionsArray.forEach(function(competitionObj, index){

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






    }

    function addYearOptions (selectElement) {
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
        }

    function addMonthOptions (selectElement) {
        var i,
            optionElement;

        // Create elements
        for (i = 1; i <= 12; i++) {
            optionElement = document.createElement("option");

            optionElement.setAttribute("value", ("0" + i).slice (-2));
            optionElement.innerHTML = ("0" + i).slice (-2);

            selectElement.appendChild(optionElement);
        }
    }

    function addDayOptions (selectElement) {
        var i,
            optionElement;

        // Create elements
        for (i = 1; i <= 31; i++) {
            optionElement = document.createElement("option");

            optionElement.setAttribute("value", ("0" + i).slice (-2));
            optionElement.innerHTML = ("0" + i).slice (-2);

            selectElement.appendChild(optionElement)
        }
    }

    function addHourOptions (selectElement) {
        var i,
            optionElement;

        // Create elements
        for (i = 0; i <= 23; i++) {
            optionElement = document.createElement("option");

            optionElement.setAttribute("value", ("0" + i).slice (-2));
            optionElement.innerHTML = ("0" + i).slice (-2);

            selectElement.appendChild(optionElement)
        }
    }

    function addMinuteOptions (selectElement) {
        var i,
            optionElement;

        // Create elements
        for (i = 0; i <= 59; i++) {
            optionElement = document.createElement("option");

            optionElement.setAttribute("value", ("0" + i).slice (-2));
            optionElement.innerHTML = ("0" + i).slice (-2);

            selectElement.appendChild(optionElement)
        }
    }


    Date.prototype.toCustomString = function () {
        return this.getUTCFullYear() + "-" + ("0" + (this.getUTCMonth()+1)).slice (-2) + "-" + ("0" + this.getUTCDate()).slice (-2) + " (" + ("0" + this.getUTCHours()).slice (-2) + ":" + ("0" + this.getUTCMinutes()).slice (-2) + ")";
    };