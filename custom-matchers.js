const customMatchers = {
    toBeCalculator: function() {
        return {
            compare: function(actual) {
                const result = {
                    pass: actual instanceof Calculator,
                    message: ''
                }

                if (result.pass) {
                    // For the negation of the matcher.
                    result.message = `Expected ${actual} to be not instance of Calculator.`;
                } else {
                    result.message = `Expected ${actual} to be instance of Calculator.`;
                }

                return result;
            }
        }
    }
}