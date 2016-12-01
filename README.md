# regalia [![Build Status](https://travis-ci.org/mightyiam/regalia.svg?branch=master)](https://travis-ci.org/mightyiam/regalia) [![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Helps you make symbol trees

## Why?

Because we may like to use [symbols as constants](https://medium.com/@mightyiam/symbols-as-constants-25c79231a348#.y7pgqsifi).

Or any other reason you may think of.

Yet, there is some repetition:

```js
const constants = {
  // there is no syntax to infer the symbol description from the key
  // or from anything else, so we repeat ourselves:
  doNotRepeatYourself: Symbol('doNotRepeatYourself')
}
```

## How?

```js
const regalia = require('regalia')
regalia(['foo'])
// { foo: Symbol(foo) }
```

Symbols are created using `Symbol()`.

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

### `Symbol.for()`

**Not supported**. Pull request welcome.
Suggested API:

```js
const regaliaFor = require('regalia').for // NOT SUPPORTED
```
