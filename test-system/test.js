const fs = require('fs');
const path = require('path');
const TestRun = require('../test-system/TestRun');
const assertEqual = require('./assertEqual');

const basePath = process.cwd();
const relativeTestPath = process.argv.slice(2)[0];
const absoluteTestPath = path.join(basePath, relativeTestPath);

const testRun = new TestRun();

global.testSuite = testRun.testSuite;
global.assert = {
    equal: assertEqual
};

const testFileNames = fs
    .readdirSync(absoluteTestPath)
    .filter(fileName => fileName.endsWith('test.js'));

testFileNames.forEach(function (fileName) {
    const filePath = path.join(absoluteTestPath, fileName);
    
    require(filePath);
});