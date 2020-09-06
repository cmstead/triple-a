function Fail(message) {
    this.message = message;
}

Fail.prototype = {
    getPassStatus: () => false,
    getMessage: function () {
        return this.message;
    }
};

module.exports = Fail;