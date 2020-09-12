const tripleA = require('../index');
const chai = require('chai');

const { testCase } = testSuite('Triple-A Tests');

testCase('All methods are called, resolving in an assertion call', function () {
    let completed = false;
    const testPromise = new Promise(function (resolve, reject) {
        timeoutId = setTimeout(() => {
            if (completed) {
                resolve();
            } else {
                reject(new Error('Assertion was never run'));
            }
        }, 10);
    });

    tripleA
        .arrange(() => null)
        .act(() => null)
        .assert(() => {
            completed = true;
        });

    return testPromise;
});

testCase('Values pass from stage to stage', function () {
    return tripleA
        .arrange(() => ({ testing: 'test' }))
        .act((arrangement) => ({ arrangedValue: arrangement.testing }))
        .assert(({ result: actResult }, { isEqual }) =>
            isEqual(actResult.arrangedValue, 'test'));
});

testCase('Properly manages async setup', function () {
    const expectedResult = 'This is the result';

    return tripleA
        .arrange(() => Promise.resolve(expectedResult))
        .act((arrangedValue) => arrangedValue)
        .assert(({ result: arrangedResult }, { isEqual }) =>
            isEqual(arrangedResult, expectedResult));
});

testCase('Properly manages async action', function () {
    const expectedResult = 'This is the actionResult';

    return tripleA
        .arrange(() => null)
        .act(() => Promise.resolve(expectedResult))
        .assert(({ result: actionResult }, { isEqual }) =>
            isEqual(actionResult, expectedResult));
});

testCase('Assertion receives error from arrangement when it occurs', function () {
    const expectedMessage = 'This is an error message';

    return tripleA
        .arrange(() => Promise.reject(new Error(expectedMessage)))
        .act(() => null)
        .assert(({ error }, { isEqual }) =>
            isEqual(error.message, expectedMessage));
});

testCase('Assertion receives error from action when it occurs', function () {
    const expectedMessage = 'This is another error message';

    return tripleA
        .arrange(() => null)
        .act(() => Promise.reject(new Error(expectedMessage)))
        .assert(({ error }, { isEqual }) =>
            isEqual(error.message, expectedMessage));
});

testCase('Assertion options can be configured', function () {
    const expectedOutput = true;

    return tripleA
        .configure({ assertions: chai.assert })
        .arrange(() => null)
        .act(() => expectedOutput)
        .assert(({ result: expectedResult }, { isTrue }) => 
            isTrue(expectedResult));
})