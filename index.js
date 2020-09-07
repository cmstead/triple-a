const assertions = require('./modules/assertions');
const { normalizeAsync, promisify } = require('./modules/asyncUtils');

function TripleA(arrangement, assertions) {
    this.arrangement = arrangement;
    this.assertions = assertions;

    this.act = this.act.bind(this);
    this.assert = this.assert.bind(this);
}

TripleA.prototype = {
    act: function (action) {
        this.action = action;

        return {
            assert: this.assert
        };
    },
    assert: function (assertion) {
        this.assertion = assertion;

        return this.run();
    },
    run: function () {
        const assertions = this.assertions;
        
        return normalizeAsync(this.arrangement())
            .then((arrangedValue) => normalizeAsync(this.action(arrangedValue)))
            .then((actionResult) => this.assertion({ result: actionResult, error: null }, assertions))
            .catch((error) => this.assertion({ result: null, error: error }, assertions));
    }
};

function arrange(arrangement, assertions) {
    const tripleA = new TripleA(arrangement, assertions);

    return {
        act: tripleA.act
    }
}

module.exports = {
    arrange: (arrangement) => arrange(arrangement, assertions),
    configure: function ({ assertions }) {
        return {
            arrange: (arrangement) => arrange(arrangement, assertions)
        };
    },
    promisify
}