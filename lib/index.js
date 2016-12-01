const traverse = require('traverse')
const arrayToHash = require('array-to-hash')

const strToSymbol = require('./str-to-symbol')

const regalia = (def) => {
  return traverse(def)
    .map(function (val) {
      if (typeof this.key === 'string' && this.key.includes('.')) {
        throw new Error('no periods in properties')
      }
      if (Array.isArray(val)) {
        this.update(arrayToHash(val))
      } else if (this.isLeaf && val === undefined) {
        this.update(strToSymbol(this.path.join('.')))
      }
    })
}

module.exports = regalia
