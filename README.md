
<!-- GENERATED DOCUMENT! DO NOT EDIT! -->
# Triple-A #
#### Structured testing for better communication ####


## Table Of Contents ##

- [Section 1: What is it?](#user-content-what-is-it?)
- [Section 2: Installation](#user-content-installation)
- [Section 3: How Do I Use It?](#user-content-how-do-i-use-it?)

### What is it? ###

Triple-A is a testing tool designed to help you structure your tests in a sensible way. It is directly based on the "AAA" or Arrange/Act/Assert testing approach, and carries a philosophy:

1. Only test one thing at a time
2. Order of test implementation facilitates communication
3. More, descriptive tests is better
4. Isolated tests are best

Triple-A is opinionated because that's what it's for.
    

### Installation ###

#### Prerequisites ####

In order to use Triple-A you will need:

1. to have Node.js installed on your computer
    - [Get Node.js](https://nodejs.org/)
2. a working understanding of how to use npm
    - [A beginners guide to npm](https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/)
3. to have a testing framework installed in your project
    - [Mocha](https://www.npmjs.com/package/mocha)
    - [Jasmine](https://www.npmjs.com/package/jasmine)
    - [Jest](https://www.npmjs.com/package/jest)
    - Or other framework

#### Installing Triple-A ####

Triple-A is a testing framework, intended for development use. Don't deploy it to production.

Install it as a development dependency this way:

`npm install triple-a --save-dev`
    

### How Do I Use It? ###

Triple-A works through chaining together the arrange, act, and assert segments of your test. Every step stands alone, and supports asynchronous behavior out of the box. Run it and go.

Here's a single test for FizzBuzz:

```javascript
const tripleA = require('triple-a');

it('returns FizzBuzz when called with 15', () => {
    return tripleA
        .arrange(() => {
            const testValue = 15;

            return testValue;
        })

        .act((testValue) => {
            return fizzBuzz(testValue);
        })

        .assert(({ result }, { assertEqual }) => {
            const expectedValue = 'FizzBuzz';

            assertEqual(result, expectedValue);
        })
});
```

For promise-returning async tests, follow the same form. Make sure to return the Triple-A output as it provides a promise to the test system. This uniformity makes tests easier to read and understand.

In the end, test code is organized into self-managing buckets. This means it is easier to parse the code when read. Also, when the tests run, the code is fully isolated. This isolation makes it safe, even when tests are parallelized.

#### Promisify ####

#### Configuring Assertions ####
    

<!-- GENERATED DOCUMENT! DO NOT EDIT! -->
    