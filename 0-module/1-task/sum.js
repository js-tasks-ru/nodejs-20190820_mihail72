function sum(a, b) {
  const args = [].slice.call(arguments)
  if (args.some(arg => typeof arg === 'number')) {
    return args.reduce((sum, cur) => sum + cur)
  } else {
    throw new TypeError('invalid data')
  }
}

module.exports = sum;
