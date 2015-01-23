
Date.prototype.toCustomString = function () {
    return this.getUTCFullYear() + "-" + ("0" + (this.getUTCMonth()+1)).slice (-2) + "-" + ("0" + this.getUTCDate()).slice (-2) + " (" + ("0" + this.getUTCHours()).slice (-2) + ":" + ("0" + this.getUTCMinutes()).slice (-2) + ")";
};