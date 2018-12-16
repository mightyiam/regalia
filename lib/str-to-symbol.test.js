const test = require('ava')
const descOfSymbol = require('symbol-description')

const subject = require('./str-to-symbol')

test('exports a function', t => {
  t.is(typeof subject, 'function')
})

test('of arity 1', t => {
  t.is(subject.length, 1)
})

test('returns a symbol', t => {
  t.is(typeof subject(), 'symbol')
})

test('symbol’s description is provided string', t => {
  const str = 'foo'
  t.is(descOfSymbol(subject(str)), str)
})
