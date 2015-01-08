cois-observable
===========

The observer pattern ready for the browser

Usage
-----

Given a constructor `Model`, the details are not important, you can make it observable in the following manner.

```js
function Model(){
  ns.Observable.call(this);
  /* rest of constructor */
}
Model.prototype = Object.create(ns.Observable.prototype);
Model.prototype.constructor = Model;
```

When you have created an instance of `Model`, you can register an observer for a specific event with the following code.

```js
var model = new Model();
model.on('foo', function(message){ console.log('foo was signaled with message:' + message); });
```

Inside one of `Model` methods you then can signal `foo`.

```js
Model.prototype.bar = function(){
  /* bar functionality */
  this.signal('foo', 'bar was called');
};
```
