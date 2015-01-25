
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

// Add move method for Array.
Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
};