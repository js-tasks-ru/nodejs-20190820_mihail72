const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  #limit = 0;
  #currentSize = 0;

  constructor(options) {
    super(options);
    this.#limit = options.limit;
  }

  _transform(chunk, encoding, callback) {
    this.#currentSize += Buffer.byteLength(chunk);
    if (this.#currentSize > this.#limit) {
      callback(new LimitExceededError());
    } else {
      this.push(chunk);
    }
    callback();
  }
}

module.exports = LimitSizeStream;
