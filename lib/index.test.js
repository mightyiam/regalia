const { test } = require('ava')
const mock = require('mock-require')
const { isEqual } = require('lodash')

const strToSymbolStub = str => Symbol.for(str)
mock('./str-to-symbol', strToSymbolStub)

const subjectPath = '.'
const subject = require(subjectPath)

test('exports a function', t => {
  t.is(typeof subject, 'function')
})

const expectedIOs = [
  {
    input: ['one'],
    output: { one: Symbol.for('one') }
  },
  {
    input: [
      'one',
      'two'
    ],
    output: {
      one: Symbol.for('one'),
      two: Symbol.for('two')
    }
  },
  {
    input: [
      'one',
      'two',
      'three'
    ],
    output: {
      one: Symbol.for('one'),
      two: Symbol.for('two'),
      three: Symbol.for('three')
    }
  },
  {
    input: { a: ['one'] },
    output: { a: { one: Symbol.for('a.one') } }
  },
  {
    input: {
      a: [
        'one',
        'two'
      ]
    },
    output: {
      a: {
        one: Symbol.for('a.one'),
        two: Symbol.for('a.two')
      }
    }
  },
  {
    input: {
      a: [
        'one',
        'two',
        'three'
      ]
    },
    output: {
      a: {
        one: Symbol.for('a.one'),
        two: Symbol.for('a.two'),
        three: Symbol.for('a.three')
      }
    }
  },
  {
    input: {
      a: ['one'],
      b: ['one']
    },
    output: {
      a: { one: Symbol.for('a.one') },
      b: { one: Symbol.for('b.one') }
    }
  },
  {
    input: {
      a: ['one'],
      b: ['one']
    },
    output: {
      a: { one: Symbol.for('a.one') },
      b: { one: Symbol.for('b.one') }
    }
  },
  {
    input: { a: { ⅰ: ['one'] } },
    output: { a: { ⅰ: { one: Symbol.for('a.ⅰ.one') } } }
  },
  {
    input: { 0: ['one'] },
    output: { 0: { one: Symbol.for('0.one') } }
  }
]

expectedIOs.forEach(({ input, output: expected }, i) => {
  test(`expected input-output #${i}`, t => {
    const actual = subject(input)
    t.true(isEqual(actual, expected))
  })
})

const periodErrorMsg = 'no periods in properties'
const errorTests = [
  {
    name: 'period in leaf name',
    input: { 'has.period': ['foo'] },
    message: periodErrorMsg
  },
  {
    name: 'period in key name',
    input: ['has.period'],
    message: periodErrorMsg
  },
  {
    name: 'number leaf nodes',
    input: [0]
  },
  {
    name: 'function leaf nodes',
    input: [() => {}]
  },
  {
    name: 'array leaf nodes',
    input: [[]]
  },
  {
    name: 'set leaf nodes',
    input: [new Set()]
  },
  {
    name: 'map leaf nodes',
    input: [new Map()]
  },
  {
    name: 'object in array',
    input: [{}]
  }
]

errorTests.forEach(({ name, input, message }) => {
  test(`throws \`${Error.name}\` for ${name}`, t => {
    const error = t.throws(() => subject(input), Error)
    if (message) t.is(error.message, message)
  })
})

test('input !== output', t => {
  const input = ['foo']
  t.not(subject(input), input)
})
