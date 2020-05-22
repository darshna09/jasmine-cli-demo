describe('calculator.js', function() {
    let calculator;
    let calculator2;

    describe('Calculator', function () {
        
        beforeEach(function() {
            calculator = new Calculator();
            calculator2 = new Calculator();
        });

        it('should initialise the total', function() {
            expect(calculator.total).toBe(0);
        });
    
        it('has common operations', function() {
            expect(calculator.add).toBeDefined();
            expect(calculator.subtract).toBeDefined();
            expect(calculator.multiply).toBeDefined();
            expect(calculator.divide).toBeDefined();
        });
    
        it('can overwrite total', function() {
            calculator.total = null;
            expect(calculator.total).toBeNull();
        });
    
        it('can be instantiated', function() {
            expect(calculator.constructor.name).toContain('Calc');  // calculator.constructor.name = 'Calculator'
        });

        it('instanstiates unique object', function() {
            expect(calculator).not.toBe(calculator2);
        });
    
        it('instanstiates using custom matcher', function() {
            jasmine.addMatchers(customMatchers);
            expect(calculator).toBeCalculator();
            expect(2).not.toBeCalculator();
        });

        describe('add()', function() {
            it('should add number to total', function() {
                calculator.add(5);
                expect(calculator.total).toBe(5);
            });
        });

        describe('subtract()', function() {
            it('should subtract number from total', function() {
                calculator.total = 30;
                calculator.subtract(5);
                expect(calculator.total).toBe(25);
            });
        });

        describe('multiply()', function() {
            it('should multiply number to total', function() {
                calculator.total = 100;
                calculator.multiply(5);
                expect(calculator.total).toBe(500);
            });

            it('does not handle NaN', function() {
                calculator.total = 100;
                calculator.multiply('a');
                expect(calculator.total).toBeNaN();
            });

            it('returns total', function() {
                calculator.total = 100;
        
                expect(calculator.multiply(30)).toBe(3000);
                expect(calculator.total).toMatch(/-?\d+/);
                expect(calculator.total).toBeNumber();
                expect(calculator.total).toEqual(jasmine.anything());
            });
        });

        describe('divide()', function() {
            it('should divide total by number', function() {
                calculator.total = 300;
                calculator.divide(5);
                expect(calculator.total).toBe(60);
            });

            it('handles divide by zero', function() {
                calculator.total = 100;
                calculator.multiply('a');
                expect(function() { calculator.divide(0); }).toThrow();
                expect(function() { calculator.divide(0); }).toThrowError(Error);
                expect(function() { calculator.divide(0); }).toThrowError(Error, 'Cannot divide by Zero');
            });
        });

        describe('get version', function() {
            it('fetches version from external source', function(done) {
                spyOn(window, 'fetch').and.returnValue(Promise.resolve(
                    new Response ('{ "version": "0.1" }')
                ));
                calculator.version.then(function(version) {
                    expect(version).toBe('0.1');
                    done();
                });
            });

            it('fetches version from external source with async await', async function(done) {
                spyOn(window, 'fetch').and.returnValue(Promise.resolve(
                    new Response ('{ "version": "0.1" }')
                ));
                const version = await calculator.version;
                expect(version).toBe('0.1');
                done();
            });
        });
    });
});