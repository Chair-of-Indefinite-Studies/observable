describe('ns.Observable', function(){
    var observable;

    beforeEach(function(){
	observable = new ns.Observable();
    });

    it('should exist', function(){
	expect(ns.Observable).toBeDefined();
    });

    it('should be constructed', function(){
	expect(observable).toBeDefined();
    });

    it('should register observers', function(){
	expect(function(){
	    observable.on('test', function(){ /* do nothing */ });
	}).not.toThrow();
    });

    it('should signal observers', function(){
	var notified = false;
	observable.on('test', function(){ notified = true; });

	observable.signal('test');

	expect(notified).toBeTruthy();
    });

    it('should signal observers with arguments', function(){
	var actualValue;
	var expectedValue = {};
	observable.on('test', function(value){ actualValue = value; });

	observable.signal('test', expectedValue);

	expect(actualValue).toBe(expectedValue);
    });

    it('should differentiate on events', function(){
	var aNotified = false;
	var bNotified = false;
	observable.on('a', function(){ aNotified = true; });
	observable.on('b', function(){ bNotified = true; });

	observable.signal('a');

	expect(aNotified).toBeTruthy();
	expect(bNotified).toBeFalsy();
    });

    it('should allow multiple observers', function(){
	var firstNotified = false;
	var secondNotified = false;
	observable.on('a', function(){ firstNotified = true; });
	observable.on('a', function(){ secondNotified = true; });

	observable.signal('a');

	expect(firstNotified).toBeTruthy();
	expect(firstNotified).toBeTruthy();
    });

    it('should throw an error on undefined observers', function(){
	expect(function(){
	    observable.on('test', undefined);
	}).toThrow();
    });

    it('should throw an error on non-function observers', function(){
	expect(function(){
	    observable.on('test', {});
	}).toThrow();
    });
});
