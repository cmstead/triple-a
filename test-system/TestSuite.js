const TestCase = require('./TestCase');

function TestSuite(description) {
    this.testCases = [];
    this.description = description;

    this.testCase = this.testCase.bind(this);

    this.testCase.skip = () => null;
}

TestSuite.prototype = {
    run: function () {
        const testCaseResults = this.testCases.map(testCase => testCase.run());

        return Promise
            .all(testCaseResults)
            .then(results => this.testCaseResults = results);
    },

    testCase: function (description, testBehavior) {
        const testCase = new TestCase(description, testBehavior);

        this.testCases.push(testCase);
    },

    displayResults: function () {
        console.log(this.description);
        
        this.testCases.forEach(function(testCase) {
            const testStatus = testCase.getTestResult() ? 'Pass: ' : 'Fail: ';

            console.log('  ' + testStatus + testCase.getDescription());
            if(!testCase.getTestResult()) {
                console.log('    - ' + testCase.getTestCaseResultMessage());
            }
        });
    },

    getTestCaseResults: function () {
        return this.testCaseResults;
    }
};

module.exports = TestSuite;