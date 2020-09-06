const { testCase } = testSuite('Triple-A Tests');

testCase('This is a passing test', function () {
    // do nothing an pass
});

testCase('This is a failing test', function () {
    assert.equal(false, true, 'This failed because I compared false to true')
});
