
Date.prototype.toCustomString = function () {
    return this.getUTCFullYear() + "-" + ("0" + (this.getUTCMonth()+1)).slice (-2) + "-" + ("0" + this.getUTCDate()).slice (-2) + " (" + ("0" + this.getUTCHours()).slice (-2) + ":" + ("0" + this.getUTCMinutes()).slice (-2) + ")";
};

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}