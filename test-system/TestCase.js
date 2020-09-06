const Pass = require('./Pass');
const Fail = require('./Fail');

function isThenable(value) {
    return value !== null
        && typeof value === 'object'
        && typeof value.then === 'function';
}

function TestCase(description, testBehavior) {
    this.description = description;
    this.testBehavior = testBehavior;
}

TestCase.prototype = {
    run: function () {
        try{
            const testResult = this.testBehavior();
    
            if(isThenable(testResult)) {
                return testResult
                    .then(() => this.setPassResult())
                    .catch((error) => this.setFailResult(error));
            } else {
                this.setPassResult();
                return Promise.resolve(this.testResult);
            }
        } catch (error) {
            this.setFailResult(error);

            return Promise.resolve(this.testResult);
        }
    },

    getDescription: function () {
        return this.description;
    },

    getTestCaseResultMessage: function () {
        return this.testResult.getMessage();
    },

    getTestResult: function () {
        return this.testResult.getPassStatus();
    },

    setPassResult: function () {
        this.testResult = new Pass();
        return this.testResult;
    },

    setFailResult: function (error) {
        this.testResult = new Fail(error.message);
        return this.testResult;
    }
};

module.exports = TestCase;