function isThenable(value) {
    return value !== null
        && typeof value === 'object'
        && typeof value.then === 'function';
}

function normalizeAsync(result) {
    if (isThenable(result)) {
        return result
    } else {
        return Promise.resolve(result);
    }
}

function getCallbackHandler(resolve, reject) {
    return function (error, ...rest) {
        if(Boolean(error)) {
            reject(error);
        } else {
            resolve(...rest);
        }
    }
}

function promisify(callbackTakingFunction) {
    return function (...args) {
        return new Promise(function(resolve, reject) {
            const callbackHandler = getCallbackHandler(resolve, reject);

            callbackTakingFunction(...args.concat(callbackHandler));
        });
    }
}

module.exports = {
    normalizeAsync,
    promisify
};