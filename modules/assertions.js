function isValidErrorMessage(message) {
    return typeof message === 'string' && message.trim() !== '';
}

function buildErrorMessage(actualValue, expectedValue) {
    return `expected value ${expectedValue}, but got ${actualValue}`;
}

function getErrorMessage(actualValue, expectedValue, message) {
    return isValidErrorMessage(message)
        ? message
        : buildErrorMessage(actualValue, expectedValue);
}

function isEqual(testValue, expectedValue, message) {
    if (testValue !== expectedValue) {
        const errorMessage = getErrorMessage(testValue, expectedValue, message);

        throw new Error(errorMessage);
    }
}

module.exports = {
    isEqual
};