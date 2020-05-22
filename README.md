# Simple Calculater - Testing with Jashmine

## Creating the Simple Calculator

This calculator is going to do simple calculations: `+`, `-`, `*`,  and `/`
For unknown opetations and invlid numbers as input the message `Operation is not recognized` is shown.

### Project Structure

- 2.calculator (parent folder)
    - simple-calculator.html
    - simple-calculator.js (core functionality for the calculator)
    - main.js
    - style.css
    - README.md

Make sure the simple caluclator is up and running.

### Getting started with Jasmine

#### Getting the Jasmine code

1. Visit the site [Github: Jasmine Release](https://github.com/jasmine/jasmine/releases).
2. Dowload the latest release ZIP file. For this project I am using the version: *3.5.0*
3. Unzip the file and rename the `SpecRunner.html` to `spec-runner.html` (This is done just as a preference for naming convention)
4. Copy the `spec-runner.html` and `lib` folder and paste them to the calculator folder.
5. Open the lib forlder and copy the content of the folder inside it to the lib folder. (This is done to remove one more folder.)
6. Inside `spec-runner.html` correct the paths and open it in the browser.

Result: There will be no specs right now.

##### Project Structure

- 2.calculator (parent folder)
    - simple-calculator.html
    - simple-calculator.js (core functionality for the calculator)
    - main.js
    - style.css
    - README.md
    - spec-runner.html
    - lib
        - boot.js
        - jasmine_favicon.png
        - jasmine-html.js
        - jasmine.css
        - jasmine.js

### Jasmine: Suits

A suite is a group of specs or a group of tests. In other words it is used to organise our specs.

#### Naming conventions

`JS_FILE_NAME.spec.js` or `JS_FILE_NAME.spec.js`.

For example, `simple-calculator.spec.js`.

#### Steps

1. Create new file `simple-calculator.spec.js` inside the parent folder. 
2. Include this inside the `spec-runner.html`.

##### describe

`describe` is globally available function called with two parameters: title of the suite and anonymous function.

```javascript
describe('Title of the suite', function() {
    // Here the specs will go.
});
```

_Add this to the `simple-calculator.spec.js` and run the `spec-runner.html`._

### Jasmine: Specs

Specs is short for specifications. In Jasmine specs and tests can be used interchangebly.

It is a set (group) of expectations that test the state of the code.

##### it

`it` is another globally available function used to write the spec. It is called with two parameters: title of the spec and anonymous function.

```javascript
describe('Title of the suite', function() {
    it('Title of the spec', function() {
        // Here the expectations will go.
    });
});
```

_Add this to the `simple-calculator.spec.js` and run the `spec-runner.html`. Add the specs for add, subtract, multiply, and divide with proper title._

### Jasmine: Expectations

Expectations means assertions (statements) which is either true/false.

`expect` 5 + 5 `to be` 10 -> `true`
`expect` 5 + 9 `to be` 10 -> `false` // This is actually 9

##### expect

`expect(/* Actual value */).toBe(/* Expected value */)`

#### Passing and failing specs

- All expectations are true > the spec is successful
- One or more expectations is false > the spec is unsuccessful

### Disabled spec

A spec that will report as pending and will not be executed. Common use cases:
1. Change in code.
2. Test Driven Development. (Here we write the test first and then code.)
In both the scenarios we want the specs to be disabled. It is done using `xit`.

```javascript
describe('Simple calculator', function() {
    it('should add', function() {
        expect(5+5).toBe(10);
    });

    // Disabled spec using xit
    xit('should subtract', function() {
        expect(15-5).toBe(10);
    });
});
```

### Disabled suites

All specs within the disabled suite will be marked as pending and not executed. This is done using `xdescribe`.

```javascript
// Disabled suite using xdescribe
xdescribe('Simple calculator', function() {
    it('should add', function() {
        expect(5+5).toBe(10);
    });

    it('should subtract', function() {
        expect(15-5).toBe(10);
    });
});
```

### Matchers

It is a function which implements a boolean comparision between actual value and expected value. For example `toBe`

`expect(/* Actual value */).toBe(/* Expected value */)`
Compares actual value and expected value, returns `true` or `false`.

A matcher is responsible for reporting to jasmine if the expectation is true or false. Hence, it is reponsible for the passing or failing of a spec.

For the current Jasmine version *3.5.0* in this project here is the [list of the matchers](https://jasmine.github.io/api/3.5/matchers.html).
Please refer [here](https://jasmine.github.io/pages/docs_home.html) for Jasmine Documentation.

##### toBe

`toBe` => Uses `===` => expected === actual

```javascript
it('should initialise the total', function() {
    const calculator = new Calculator();
    expect(calculator.total).toBe(0);
});
```

##### toEqual

`toEqual` => Deep Equality Comparision (with `===`) => Equal keys and equal values

```javascript
it('should have constructor', function() {
    const calculator1 = new Calculator();
    const calculator2 = new Calculator();
    expect(calculator1).toBe(calculator2); // Fails since toBe is === (strict equality)
});
```

```javascript
it('should have constructor', function() {
    const calculator1 = new Calculator();
    const calculator2 = new Calculator();
    expect(calculator1).toEqual(calculator2);
});
```

```javascript
it('should have constructor', function() {
    const calculator1 = new Calculator();
    const calculator2 = new Calculator();
    calculator1.total = 10;
    expect(calculator1).toEqual(calculator2);   // Fails as $.total = 10 to equal 0.
});
```

```javascript
it('should have constructor', function() {
    const calculator1 = new Calculator();
    const calculator2 = new Calculator();
    calculator1.total = "0";
    expect(calculator1).toEqual(calculator2);   // Fails as $.total = "0" to equal 0.
});
```

##### toBeTruthy and toBeFalsy

A truthy is a value that translates to `true` when evaluated in a boolean context.
A falsy is a value that translates to `false` when evaluated in a boolean context.

```javascript
it('should initialise the total', function() {
    const calculator = new Calculator();
    expect(calculator.total).toBeFalsy();
});
```

##### Negating matchers

By using `not` before the matchers (any matcher) we can negate their results.

```javascript
it('should have constructor', function() {
    const calculator1 = new Calculator();
    const calculator2 = new Calculator();
    // expect(calculator1).toBe(calculator2);   // Fails since toBe is === (strict equality)
    expect(calculator1).not.toBe(calculator2);  // Passes.
});
```

##### toBeDefined and toBeUndefined

`undefined` is a 
- global property
- primitive data type (not an object and has no methods)
- a value which is assigned to variables that have been ddeclared but not defined.

```javascript
it('has common operations', function() {
    const calculator = new Calculator();
    expect(calculator.add).toBeDefined();
    expect(calculator.subtract).not.toBeUndefined();
});
```

##### toBeNull

```javascript
it('can overwrite total', function() {
    const calculator = new Calculator();
    calculator.total = null;
    expect(calculator.total).toBeNull();
});
```

##### toContain

```javascript
it('can be instantiated', function() {
    const calculator = new Calculator();
    expect(calculator.constructor.name).toContain('Calc');  // calculator.constructor.name = 'Calculator'
});
```

##### toBeNaN

Compares if the value is `NaN` (Not a Number).

Why do we need this? We cannot compare `NaN` with `===`. Hence we need a new matcher.

```javascript
NaN === NaN;   // false
let test = NaN;
test === test; // false
```
```javascript
it('does not handle NaN', function() {
    const calculator = new Calculator();
    calculator.total = 100;
    calculator.multiply('a');
    expect(calculator.total).toBeNaN();
});
```

##### toThrow and toThrowError

`toThrow` expect a function to `throw` something.

`toThrowError(expected, message)` expect a function to `throw` an `Error`. Here `expected` is of type `Error` and `message` can be a regular expression or string.

```javascript
it('handles divide by zero', function() {
    const calculator = new Calculator();
    calculator.total = 100;
    calculator.multiply('a');
    expect(function() { calculator.divide(0); }).toThrow();
    expect(function() { calculator.divide(0); }).toThrowError(Error);
    expect(function() { calculator.divide(0); }).toThrowError(Error, 'Cannot divide by Zero');
});
```

TODO: More information required for understanding the [function wrapper](https://cisco.udemy.com/course/unit-testing-your-javascript-with-jasmine/learn/lecture/10446406#questions/10703140).

###### toMatch

`toMatch` is used to match an actual value to a regular expression (or string).

```javascript
it('returns total', function() {
    const calculator = new Calculator();
    calculator.total = 100;

    expect(calculator.multiply(30)).toBe(3000);
    expect(calculator.total).toMatch(/-?\d+/);
});
```

##### Match anything

Asymmetric matchers.

`jasmine.anything()`: Get a matcher, usable in any matcher that uses Jasmine's equality (e.g. `toEqual`, `toContain`, or `toHaveBeenCalledWith`), that will succeed if the actual value being compared is not `null` and not `undefined`.

```javascript
it('returns total', function() {
    const calculator = new Calculator();
    calculator.total = 100;

    expect(calculator.multiply(30)).toBe(3000);
    expect(calculator.total).toEqual(jasmine.anything());
});
```
##### Custom Matcher

This is required when none of the existing matchers can be used. Rarely used.

Add new file `custom-matchers.js` in the parent folder.

```javascript
const customMatchers = {
    // Custom Matcher: toBeCalculator
    toBeCalculator: function() {
        return {
            compare: function(actual) {
                const result = {
                    pass: actual instanceof Calculator,
                    message: ''     // Message is the pass is false.
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
```

Import the JS file in `spec-runner.html` using `script` tag.

Use `jasmine.addMatchers(customMatchers)` to use the created custom matcher.

```javascript
it('instanstiates using custom matcher', function() {
    jasmine.addMatchers(customMatchers);
    const calculator = new Calculator();
    expect(calculator).toBeCalculator();
    expect(2).not.toBeCalculator();
});
```

##### Third party Matcher

Imagine having access to matchers like `toBeNumber`, `toBeOddNumber`, and more. You don't need to write your own custom matchers.
[Jasmine Matchers](https://github.com/JamieMason/Jasmine-Matchers) provides a list of many such matchers.

For now we will copy the `jasmine-matchers.js` from the `dist` folder and copy in our `lib` folder.

Add `jasmine-matchers.js` in `spec-runner.html` using `script` tag.

```javascript
it('returns total', function() {
    const calculator = new Calculator();
    calculator.total = 100;
    expect(calculator.total).toBeNumber();
});
```

*Note*: In case you don't find the dist folder on the github account please switch the version 2.0.0. Or
You can run `npm install jasmine-expect --save-dev` from your terminal to install the third party matchers. Add it to your `spec-runner.html` using `<script src="node_modules/jasmine-expect/dist/jasmine-matchers.js"></script>`. This way you could use the third party matchers.

### Organizing the specs

#### Recommendation to organize the specs

- Use `describe`. We know `describe` is a collection of spec, also know as *suite*.
- Use proper naming convention
    - Create a spec file with the same name that matches the source file you are unit testing.
    - For example, `calculator.js` -> `calculator.spec.js`
- Keep the folder structure in such a way that the spec file are inline with their source file.
- By nesting suites.

#### Nesting Suites

```javascript
describe('calculator.js', function() {
    // respective calculator.js specs (it blocks)
    describe('Calculator', function () {
        // respective Calculator specs (it blocks)
        describe('add()', function() {
            // respective add() specs (it blocks)
        });
        describe('subtract()', function() {
           // respective subtract() specs (it blocks)
        });
        describe('multiply()', function() {
            // respective multiply() specs (it blocks)
        });
        describe('divide()', function() {
            // respective divide() specs (it blocks)
        });
    });
});
```

#### Setup and Teardown

*Setup*

- where we place prerequisutes for the specs.
- it executes before specs are run.
- Jasmine provides two methods as a part of setup: `beforeEach` and `beforeAll`.
    - `beforeEach`: Executed before each spec (`it`) in the suite (`describe`) in which it is called.
    - `beforeAll`: Executed _once_ before all the specs (`it`) in the suite (`describe`) in which it is called.

*Teardown*

- Clean up steps for the specs.
- It executes after the specs are run.
- Jasmine provides two methods as a part of setup: `afterEach` and `afterAll`.
    - `afterEach`: Executed after each spec (`it`) in the suite (`describe`) in which it is called.
    - `afterAll`: Executed _once_ after all the specs (`it`) in the suite (`describe`) in which it is called.

##### Example for beforeEach

```javascript
describe('calculator.js', function() {
    let calculator;
    let calculator2;
    describe('Calculator', function () {
        beforeEach(function() {
            calculator = new Calculator();
            calculator2 = new Calculator();
        });

        // ... No need to instantiate calculator inside each spec (it)
    });
});
```

##### Example for beforeAll and afterAll

Create `main.spec.js` and include this and `main.js` in `spec-runner.html`. In `main.spec.js` write the suite for `updateResult`.

```javascript
describe('main.js', function() {
    describe('updateResult()', function() {
        let element;
        beforeAll(function() {
            // updateResult needs an element with ID 'result'
            element = document.createElement('div');
            element.setAttribute('id', 'result');
            document.body.appendChild(element);
        });
        afterAll(function() {
            // once the suite is complete we don't need the element `result'
            const element = document.getElementById('result');
            document.body.removeChild(element);
        });
        it('adds result to DOM', function() {
            updateResult(5);    // enters 5 in the div (visible on the webpage.)
            expect(element.innerText).toBe('5');
        });
    });
});
```

##### this

We have seen that we are creating variables for sharing them. We can get rid of them using the `this` keyword.

```javascript
describe('updateResult()', function() {
    beforeAll(function() {
        this.element = document.createElement('div');
        this.element.setAttribute('id', 'result');
        document.body.appendChild(this.element);
    });
    afterAll(function() {
        document.body.removeChild(this.element);
    });
    it('adds result to DOM', function() {
        updateResult(5);
        expect(this.element.innerText).toBe('5');
    });
});
```

*CAUTION*

```javascript
// THIS WILL WORK
describe('updateResult()', () => {
    beforeAll(function() {
        this.element = document.createElement('div');
        this.element.setAttribute('id', 'result');
        document.body.appendChild(this.element);
    });
    afterAll(function() {
        document.body.removeChild(this.element);
    });
    it('adds result to DOM', function() {
        updateResult(5);
        expect(this.element.innerText).toBe('5');
    });
});
```

Be careful while using the arrow function and the `this` keyword. In the below case you will have to create a variable to make it work.

```javascript
// THIS WILL NOT WORK
describe('updateResult()', () => {
    beforeAll(() => {
        this.element = document.createElement('div');
        this.element.setAttribute('id', 'result');
        document.body.appendChild(this.element);
    });
    afterAll(function() {
        // ERROR: Failed to execute 'removeChild' on 'Node': parameter 1 is not of type 'Node'.
        document.body.removeChild(this.element);
    });
    it('adds result to DOM', function() {
        updateResult(5);
        // ERROR: Cannot read property 'innerText' of undefined
        expect(this.element.innerText).toBe('5');
    });
});
```
### Spying on your code (stubs/test doubles)

#### Jasmine Spies

Use case:

We have `main.js` where we have the method `calculate()` which has dependencies like the `add()`, `subtract()`, `multiply()`, and `divide()` from the `Calculator` and the `updateResult()` is another dependency.
If any of these dependency fails then the `calculate()` will fail as well (false fails). It will be difficult to know if the this method failed because of its own or because of the dependencies. Hence, we want to remove this dependency when we write the spec for this method.

*Spies* create _test doubles_ and help us isolate dependencies for **true unit testing**.

A **test double** is an object that can stand in for a real object in a test, similar to how a stunt double stands in for an actor in a movie.

Thus, we will be using these _test doubles_ to replace the dependencies for the specs.

- Jasmine has test double functions called spies.
- A spy can stub any function and tracks calls to it and all arguments.
- A spy only exists in the suite (`descibe`) or spec (`it`) block in which it is defined, and will be removed after each spec. 
    - _You can use the setup and teardown methods to share the state with the spies._
- There are special matchers for interacting with spies:
    - `toHaveBeenCalled`, `toHaveBeenCalledWith`, and `toHaveBeenCalledTimes` - most commonly used.

#### Spying on Functions

In `main.js` when we are calling `calculate()` then if the provided operation is invalid we are calling `updateResult("Operation is not recognized");` and this is the function we want to spy on. We use `spyOn` to spy on the function and then we don't want to do anything using `stub()`. We are saying spy on the `updateResult` but then don't do anything, don't call it or any other action.

```javascript
spyOn(/* Object in which the function exists */, /* Function name */).and.stub();
```

is same as 

```javascript
spyOn(/* Object in which the function exists */, /* Function name */);
```

because `stub()` is default for `spyOn()`. For example consider the following code snippet. Here we want to test that `updateResult` is called in the defnied conditions `Number.isNaN(numberA) || Number.isNaN(numberB) || !operation`.

```javascript
it('validates expression if first parameter is invalid', function() {
    spyOn(window, 'updateResult');
    calculate('a + 3');
    expect(window.updateResult).toHaveBeenCalled();
    // More specific matcher.
    expect(window.updateResult).toHaveBeenCalledWith('Operation is not recognized');
    expect(window.updateResult).toHaveBeenCalledTimes(1);
});
```

##### Common special matchers for spies
 - `toHaveBeenCalled`
    ```javascript
    expect(/* FUNCTION TO BE SPIED ON */).toHaveBeenCalled();
    ```
 - `toHaveBeenCalledWith`
    ```javascript
    expect(/* FUNCTION TO BE SPIED ON */).toHaveBeenCalledWith(/* Argument with which the spied function will be called. */);
    ```
 - `toHaveBeenCalledTimes`
    ```javascript
    expect(/* FUNCTION TO BE SPIED ON */).toHaveBeenCalledTimes(/* Number of times the spied function will be called. */);
    ```

#### Spying on prototypes

Inside `calculate()` we are calling an instance of `Calculator` and then calling the methods `add()`, `subtract()` and so on. These methods are prototypes of `Calculator`. To spy on the prototypes we called the prototypes.

```javascript
it('calls add', function() {
    spyOn(Calculator.prototype, 'add');
    calculate('3 + 4');
    expect(Calculator.prototype.add).toHaveBeenCalledTimes(2);  // In the calculate() the add() is called twice.
    // The order does NOT matter.
    expect(Calculator.prototype.add).toHaveBeenCalledWith(3);   // In the calculate() the add() is called first with one parameter.
    expect(Calculator.prototype.add).toHaveBeenCalledWith(4);   // In the calculate() the add() is called first with other parameter.
});
```

```javascript
it('calls add', function() {
    // spyOn returns the method call. We can use it in our expect call.
    const spy = spyOn(Calculator.prototype, 'add');
    calculate('3 + 4');
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(3);
    expect(spy).toHaveBeenCalledWith(4);
});
```

#### callThrough

This is not an ideal case when true unit testing is considered but sometimes we want to run the dependent function. This is when `callThrough` is called. Consider the following example,
```javascript
it('calls updateResult (using callThrough)', function() {
    spyOn(window, 'updateResult');
    calculate('3 * 4');
    expect(window.updateResult).toHaveBeenCalled();
});
```
We want to spy on the `updateResult` and check that it is called with `25` once the multiply method is called. But calling the spy on the  `multiply` will not work because spy does not run it.
```javascript
it('calls updateResult (using callThrough)', function() {
    spyOn(window, 'updateResult');
    spyOn(Calculator.prototype, 'multiply');
    calculate('3 * 4');
    expect(window.updateResult).toHaveBeenCalled();
    // SPEC FAILS: Expected spy updateResult to have been called with: [ 12 ] but actual calls were: [ undefined ].
    expect(window.updateResult).toHaveBeenCalledWith(12);
});
```
Hence, we need to call the `multiply` (which is not true unit testing) using `callThrough()`.
```javascript
it('calls updateResult (using callThrough)', function() {
    spyOn(window, 'updateResult');
    spyOn(Calculator.prototype, 'multiply').and.callThrough();
    calculate('3 * 4');
    expect(window.updateResult).toHaveBeenCalled();
    expect(window.updateResult).toHaveBeenCalledWith(12);
});
```

This spy `multiply` is not being used in the assertions, it is just to display that if we install a spy and want to execute  the real implementation of the method being spied on, we must use `and.callThrough()`.

#### callFake

There will be times when you want to spy on a function with a custom implementation, in these scenarios we will use `callFake` which takes a custom function as a parameter.
In this example we are calling `multiply` with a custom implementation where it takes a `number` but returns the string `it works`.
```javascript
it('calls updateResult (using callFake)', function() {
    spyOn(window, 'updateResult');
    spyOn(Calculator.prototype, 'multiply').and.callFake(function (number) {
        return 'it works';
    });
    calculate('3 * 4');
    expect(window.updateResult).toHaveBeenCalled();
    expect(window.updateResult).toHaveBeenCalledWith('it works');
});
```

#### returnValue

Similar to `callFake` we have `returnValue` where we can define the custom return value.
```javascript
it('calls updateResult (using returnValue)', function() {
    spyOn(window, 'updateResult');
    spyOn(Calculator.prototype, 'multiply').and.returnValue('it works');
    calculate('3 * 4');
    expect(window.updateResult).toHaveBeenCalled();
    expect(window.updateResult).toHaveBeenCalledWith('it works');
});
```

#### returnValues

We can use `returnValues` to retun multiple values. For our calculate we are calling the `add` twice, once to initialize the total and then to call it if the operation is `+`. This method is called twice.
```javascript
it('calls updateResult (using returnValues)', function() {
    spyOn(window, 'updateResult');
    spyOn(Calculator.prototype, 'add').and.returnValues(null, 'whatever add returns');
    calculate('3 + 4');
    expect(window.updateResult).toHaveBeenCalled();
    expect(window.updateResult).toHaveBeenCalledWith('whatever add returns');
});
```
If you have a for loop and it going to run for 10 times then we will define 10 paramteters to the `returnValues`. While calling `toHaveBeenCalledWith` if none of the parameters match then the spec will fail.

#### Spy and throwError

If we want a function on which we are spying to throw a specific error then we can use `throwError`. In the following example we are checking error scenario for multiply.
```javascript
it('operations throwing error', function() {
    spyOn(Calculator.prototype, 'multiply').and.throwError('returns some error');
    expect(function(){ calculate('3 * 2') }).toThrowError('returns some error');
});
```

#### Spy on property (spyOnProperty)

In JavaScript we have [getters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) and [setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) and we cannot use `spyOn` to spy on these.

##### Preparation

Add a getter, version for the `Calculator` in `simple-calculator.js`.
```javascript
Object.defineProperty(Calculator.prototype, 'version', {
    get: function() {
        return '0.1';
    },
    enumerable: true,
    configurable: true
});
```
Display the version inside the `simple-calculator.html`.
```html
<div class="version">Version: <span id="version"></span></div>
```
Use the `window.onload` to call the getter.
```html
<script>
    window.onload = function() {
        updateVersion();
    }
</script>
```

If you remember while writing spec for `updateResult()` we created an element `result`. But now we don't have to create a new element `version` because we can spy on `document.getElementById()`.

In the following spec once we call the `spyOnProperty` the `version` gets `undefined` because it is converted to a spy.
```javascript
describe('updateVersion()', function() {
    it('calls calculator.version', function() {
        spyOn(document, 'getElementById').and.returnValue({
            innerText: null
        });
        // Calculator.prototype.version --> 0.1
        spyOnProperty(Calculator.prototype, 'version', 'get');
        updateVersion();
        // Calculator.prototype.version --> undefined
        expect(Calculator.prototype.version).toHaveBeenCalled();    // FAILS
    });
});
```
TODO: Why?

There are two ways of fixing it.
Way 1: Using `getOwnPropertyDescriptor`
```javascript
expect(Object.getOwnPropertyDescriptor(Calculator.prototype, 'version').get).toHaveBeenCalled();
```
Way 2: Using the return value on `spyOnProperty`. (_Preferred_)
```javascript
describe('updateVersion()', function() {
    it('calls calculator.version', function() {
        spyOn(document, 'getElementById').and.returnValue({
            innerText: null
        });
        const spy = spyOnProperty(Calculator.prototype, 'version', 'get');
        updateVersion();
        expect(spy).toHaveBeenCalled();
    });
});
```

### Testing asynchronous code

#### Using promises

The [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.

For example, let us fetch the version of the Calculator from an [external API](https://gist.githubusercontent.com/juanlizarazo/4b2d229ba483ca13b1a6d7bf3079dc8b/raw/228ac05e04118037be02c38d9b86945c1356a2e2/version.json). 
```javascript
Object.defineProperty(Calculator.prototype, 'version', {
    get: function() {
        // Returns promise with version
        return fetch("https://gist.githubusercontent.com/juanlizarazo/4b2d229ba483ca13b1a6d7bf3079dc8b/raw/228ac05e04118037be02c38d9b86945c1356a2e2/version.json")
            .then(function(result) {
                return result.json();   // Returns a promise with JSON data
            }).then(function(json) {
                return json.version;    // Returns a promise with version
            });
    },
    enumerable: true,
    configurable: true
});
```
Inside `main.js` we will update the `updateResult` to fetch the version.
```javascript
function updateVersion() {
    const calculator = new Calculator();
    const versionElement = document.getElementById("version");
    calculator.version.then(function(version) {
        versionElement.innerText = version;
    });
}
```

Now let us write the spec for the `get` in `simple.calculator.spec.js`.
```javascript
describe('get version', function() {
    it('fetches version from external source', function() {
        calculator.version.then(function(version) {
            expect(version).toBe('0.1');    // SPEC HAS NO EXPECTATIONS fetches version from external source
        });
    });
});
```
Jasmine says _there are no expectations_ but why? Because the `promise` has not returned yet. If you re-run the spec you might get the success because by then the version must have come but for sure this is not a conssitent behaviour. Hence we need to figure out a way to tell Jasmine to wait for the response. 

##### The done callback

Jasmine provides `done` for each spec, which can be used for promises. It is an asynchronous callback and it must be called if passed in the spec else it will result in *timeout*.
```javascript
describe('get version', function() {
    it('fetches version from external source', function(done) {
        calculator.version.then(function(version) {
            expect(version).toBe('0.1');
            done();
        });
    });
});
```
The problem is for this spec to run we are waiting for the fetch call to happen. If you open the Network tab in developer's tool you will notice that everytime we refresh the `spec-runner.html` the fetch call happens. We don't want to do that hence we will spy on it. We will mock the response.
```javascript
describe('get version', function() {
    it('fetches version from external source', function(done) {
        // Spy on fetch should return a promise hence we are using Promise.resolve
        // We just need the version, hence we are only returning that in the response.
        spyOn(window, 'fetch').and.returnValue(Promise.resolve(
            new Response ('{ "version": "0.1" }')
        ));
        calculator.version.then(function(version) {
            expect(version).toBe('0.1');
            done(); // Synchronous execution is complete.
        });
    });
});
```
And thus we have true unit testing.

Similarly we will be fixing the spec for `updateVersion()` in `main.spec.js` by adding a return value on our spy.
```javascript
describe('updateVersion()', function() {
    it('calls calculator.version', function() {
        spyOn(document, 'getElementById').and.returnValue({
            innerText: null
        });
        // Since calculator.version returns promise, we just have to return the promise, no need for the version.
        const spy = spyOnProperty(Calculator.prototype, 'version', 'get').and.returnValue(Promise.resolve());
        updateVersion();
        expect(spy).toHaveBeenCalled();
    });
});
```

#### Async and await with specs

An [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) function is a function declared with the async keyword. Async functions are instances of the AsyncFunction constructor, and the await keyword is permitted within them. The async and await keywords enable asynchronous, promise-based behavior to be written in a cleaner style, avoiding the need to explicitly configure promise chains.

```javascript
it('fetches version from external source with async await', async function(done) {
    spyOn(window, 'fetch').and.returnValue(Promise.resolve(
        new Response ('{ "version": "0.1" }')
    ));
    const version = await calculator.version;
    expect(version).toBe('0.1');
    done();
});
```

### Test Reports and Continuous Integration (CI)

- Dependency management (we don't want to copy dependency but use package management)
- Configure Karma test runner
- Use a headless browser (Running the test cases in terminal)
- Create coverage reports
- Push to version control (GIT)
- Build manifest (how to execute the tests)
- Continuous Integration (CI) (Automatic test runs)
- Add status bridge

#### Dependency Management

Inside `spec-runner.html` we have following scripts. It is not scalable in the long run. Hence we will get rid of these scripts and the HTML file.
```html
<script src="lib/jasmine.js"></script>
<script src="lib/jasmine-html.js"></script>
<script src="lib/boot.js"></script>
<script src="lib/jasmine-matchers.js"></script>
<!-- Custom Matchers -->
<script src="custom-matchers.js"></script>
<!-- JS -->
<script src="simple-calculator.js"></script>
<script src="main.js"></script>
<!-- SPECS -->
<script src="simple-calculator.spec.js"></script>
<script src="main.spec.js"></script>
```

- Install `npm` (node package management).
- Setup `package.json` using `npm init -y`. Make changes if required.
- Add ` "test": "karma start" ` script in package.json. We will configure Karma in later section.

#### Installing dependencies

**[Karma](https://karma-runner.github.io/latest/intro/installation.html)**

- Installing Karma:  `npm install karma --save-dev`
- Installing Jasmine: `npm install karma-jasmine jasmine-core --save-dev`
- Installing Jasmine Custom matcher: `npm install karma-jasmine-matchers --save-dev`

#### Setting up Karma configuration file

Karma needs to know about your project in order to test it and this is done via a [configuration file](https://karma-runner.github.io/5.0/config/configuration-file.html). The easiest way to generate an initial configuration file is by using the `karma init` command. Or you can create a new file `karma.conf.js` in the root directory.

Please check `package.json` and `karma-conf.js` for more information.

The `files` is important. In our case the `custom-matchers.js` is required before other JS files are loaded.

Once the configuration is complete we will run `npm test` and see that each dot in the terminal represents the spec it ran. (Dot because we had `dots` configured in `reporters` and it runs once because of `singleRun` being `true`.)

Problem with current configuration is that we have have to visit the URL provided in the terminal when we run the command `npm tests` and then the specs run. We don't want to visit the link everytime we run the specs. Hence we will be using headless browser.

#### Headless Browser

[Puppeteer](https://github.com/puppeteer/puppeteer) is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol. Puppeteer runs headless by default, but can be configured to run full (non-headless) Chrome or Chromium.

1. Install this using `npm install puppeteer --save-dev`.
2. Install `karma-chrome-launcher` using `npm install karma-chrome-launcher --save-dev`.
3. Include `karma-chrome-launcher` in `karma.conf.js` inside plugins.
4. Add one `browsers: ['ChromeHeadless'],` in `karma.conf.js`.

Visit [this](https://github.com/karma-runner/karma-chrome-launcher) link to know more about `karma-chrome-launcher`. Once configuration is complete we will see that we no longer need to visit the URL (that comes in the terminal when we run the Karma).

#### Coverage Reports

In computer science, [test coverage](https://en.wikipedia.org/wiki/Code_coverage) is a measure used to describe the degree to which the source code of a program is executed when a particular test suite runs. A program with high test coverage, measured as a percentage, has had more of its source code executed during testing, which suggests it has a lower chance of containing undetected software bugs compared to a program with low test coverage. To visualize this we have coverage reports.

For [Karma coverage](https://karma-runner.github.io/0.8/config/coverage.html):

1. Karma can generate code coverage using awesome [Istanbul](https://istanbul.js.org/): `npm i -D nyc`. 
2. We need the `karma-cli` this is needed to generate coverage report in Karma: `npm install karma-cli --save-dev`
3. Last we need to install `npm install karma-coverage --save-dev`.
4. Add `karma-coverage` as a plugin in `karma.conf.js`.
5. Configure `coverageReporter` in `karma.conf.js`. We will generate the HTML report.
6. Add `preprocessors` for configuring the Istanbul package.

Once the we run the command `npm test` we will see that it gets executed and the coverage folder comes in the root folder of the project. Open the `index.html` in browser to see the full report.

#### Pushing to version control

Steps

1. Create a new repository in your personal git account.
2. Copy the repository ssh URL.
3. In the terminal run 
    1. `git init` - local repository will be set
    2. `git remote add origin <SSH URL>`
    3. `git branch`
    4. `git status` - You will see all the files inside this as not commited.
4. Add `.gitignore` file in root directory and add `coverage\` and `node_modules`.
5. Remove `spec-runner.html` file and `lib` folder as we no longer need this file. Just for reference at the end there is the `spec-runner.html` file preview before deleting.
6. `git commit -m "Calculator"`
7. `git push origin`

**spec-runner.html**

```html
<!DOCTYPE html>
<html>
    <head>
    <meta charset="utf-8">
    <title>Simple Calculator</title>
    <link rel="shortcut icon" type="image/png" href="lib/jasmine_favicon.png">
    <link rel="stylesheet" href="lib/jasmine.css">
    <script src="lib/jasmine.js"></script>
    <script src="lib/jasmine-html.js"></script>
    <script src="lib/boot.js"></script>
    <script src="lib/jasmine-matchers.js"></script>
    <!-- Custom Matchers -->
    <script src="custom-matchers.js"></script>
    <!-- JS -->
    <script src="simple-calculator.js"></script>
    <script src="main.js"></script>
    <!-- SPECS -->
    <script src="simple-calculator.spec.js"></script>
    <script src="main.spec.js"></script>
    </head>
<body></body>
</html>
```
**lib project structure*

- lib
    - boot.js
    - jasmine_favicon.png
    - jasmine-html.js
    - jasmine-matchers.js
    - jasmine.css
    - jasmine.js





