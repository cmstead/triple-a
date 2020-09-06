function Pass() {
    this.message = 'Pass.';
}

Pass.prototype = {
    getPassStatus: () => true,
    getMessage: function () {
        return this.message
    }
};

module.exports = Pass;