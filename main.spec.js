describe('main.js', function() {
    describe('calculate()', function() {
        it('validates expression if first parameter is invalid', function() {
            spyOn(window, 'updateResult');
            calculate('a + 3');
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Operation is not recognized');
            expect(window.updateResult).toHaveBeenCalledTimes(1);
        });

        it('validates expression if second parameter is invalid', function() {
            spyOn(window, 'updateResult');
            calculate('3 + w');
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Operation is not recognized');
            expect(window.updateResult).toHaveBeenCalledTimes(1);
        });

        it('validates expression if operation is invalid', function() {
            spyOn(window, 'updateResult');
            calculate('a _ 3');
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Operation is not recognized');
            expect(window.updateResult).toHaveBeenCalledTimes(1);
        });

        it('calls add', function() {
            spyOn(Calculator.prototype, 'add');
            calculate('3 + 4');
            expect(Calculator.prototype.add).toHaveBeenCalledTimes(2);
            expect(Calculator.prototype.add).toHaveBeenCalledWith(3);
            expect(Calculator.prototype.add).toHaveBeenCalledWith(4);
        });

        it('calls subtract', function() {
            const spy = spyOn(Calculator.prototype, 'subtract');
            calculate('3 - 7');

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(7);
        });

        it('calls multiply', function() {
            const spy = spyOn(Calculator.prototype, 'multiply');
            calculate('3 * 8');

            expect(spy).toHaveBeenCalled();
            expect(spy).not.toHaveBeenCalledWith(3);
            expect(spy).toHaveBeenCalledWith(8);
        });

        it('calls divide', function() {
            const spy = spyOn(Calculator.prototype, 'divide');
            calculate('3 / 8');

            expect(spy).toHaveBeenCalled();
            expect(spy).not.toHaveBeenCalledWith(3);
            expect(spy).toHaveBeenCalledWith(8);
        });

        it('calls updateResult (using callThrough)', function() {
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'multiply').and.callThrough();
            calculate('3 * 4');
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith(12);
        });

        it('calls updateResult (using callFake)', function() {
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'multiply').and.callFake(function (number) {
                return 'it works';
            });
            calculate('3 * 4');
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('it works');
        });

        it('calls updateResult (using returnValue)', function() {
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'multiply').and.returnValue('it works');
            calculate('3 * 4');
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('it works');
        });

        it('calls updateResult (using returnValues)', function() {
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'add').and.returnValues(null, 'whatever add returns');
            calculate('3 + 4');
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('whatever add returns');
        });

        it('operations throwing error', function() {
            spyOn(Calculator.prototype, 'multiply').and.throwError('returns some error');
            expect(function(){ calculate('3 * 2') }).toThrowError('returns some error');
        });
    });

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
});