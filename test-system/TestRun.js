const TestSuite = require('./TestSuite');

function TestRun() {
    this.testSuites = [];
    this.testSuite = this.testSuite.bind(this);
    this.startRun = Date.now();

    setTimeout(() => {
        const testSuiteOutcomes = this.testSuites.map(testSuite => testSuite.run());

        Promise.all(testSuiteOutcomes).then(() => this.reportTestOutcomes());
    }, 10);
}

TestRun.prototype = {
    reportTestOutcomes: function () {
        const endRun = Date.now();
        const testCaseResults = this.getTestCaseResults();

        const totalTests = testCaseResults.length;
        const testsPassed = testCaseResults.filter(result => result.getPassStatus()).length;

        this.displayResults();

        console.log(`Total tests: ${totalTests}
Passed: ${testsPassed}
Failed: ${totalTests - testsPassed}
Total Run Time: ${endRun - this.startRun}ms
`);
        if (testsPassed !== totalTests) {
            console.log('\nTests failed! Check output for details.\n');
            process.exit(1);
        } else {
            process.exit(0);
        }
    },
    testSuite: function (description) {
        const testSuite = new TestSuite(description);
        this.testSuites.push(testSuite);

        return testSuite;
    },

    getTestCaseResults: function () {
        return this.testSuites
            .reduce((allResults, testSuite) => {
                const testCaseResults = testSuite.getTestCaseResults();
                return allResults.concat(testCaseResults);
            }, []);
    },

    displayResults: function () {
        this.testSuites.forEach(function (testSuite) {
            testSuite.displayResults();
            console.log('');
        });
    }
};

module.exports = TestRun;