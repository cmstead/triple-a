<!--bl
(filemeta
    (title "How Do I Use It?")
)
/bl-->

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