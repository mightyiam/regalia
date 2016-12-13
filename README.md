# regalia [![Build Status](https://travis-ci.org/mightyiam/regalia.svg?branch=master)](https://travis-ci.org/mightyiam/regalia) [![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Helps you make symbol trees

## Why?

Because we may like to use [symbols as constants](https://medium.com/@mightyiam/symbols-as-constants-25c79231a348#.y7pgqsifi).

Or perhaps you have a another use for symbol trees.

Yet, in writing symbol trees yourself, there may be some repetition:

```js
const constants = {
  doNotRepeatYourself: Symbol('doNotRepeatYourself')
}
```

Unlike [function names](http://www.2ality.com/2015/09/function-names-es6.html)
there is no syntax to infer the symbol description from the key.

This library provides a convenient API
for making symbol trees
and also some testing utilities.

Also:
- sensible symbol descriptions
- testing utilities (see below)

## How?

```js
const regalia = require('regalia')
regalia(['foo'])
// { foo: Symbol(foo) }
```

Symbols are created using `Symbol()` (not `Symbol.for()`).

The input is composed of arrays that contain strings.
Each array will be transformed into an object,
where the property names are the strings
and the values are symbols.

The description of each symbol
will be the same as its property name.

```js
regalia([
  'foo',
  'bar'
])
// { foo: Symbol(foo), bar: Symbol(bar) }
```

Nested hierarchies are possible, using objects:

```js
regalia({
  a: ['foo'],
  b: ['foo']
})
// { a: { foo: Symbol(a.foo) }, b: { foo: Symbol(b.foo) } }
```

Arrays can’t contain objects.

The dot notation in each symbol description
is according to its path in the tree structure.
Due to this, periods are not allowed anywhere.

## Why not `Symbol.for()`?

The theoretical benefit of symbols,
as opposed to [`Symbol.for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/for)s,
is that references to them cannot be obtained
anywhere but where they were created.
They must be exported or passed on
in order for them to reach another module.

`Symbol.for` symbols can be re-obtained *anywhere*
by calling with the same identifier.
