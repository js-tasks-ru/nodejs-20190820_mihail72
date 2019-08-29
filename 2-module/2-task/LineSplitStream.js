const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  #lines = [];
  #last = '';

  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    const chunkWithLast = this.#last + chunk;
    const lines = chunkWithLast.toString().split(os.EOL);
    this.#last = lines.pop();
    lines.forEach(item => {
      this.#lines.push(item);
    })
    callback();
  }

  _flush(callback) {
    this.#lines.push(this.#last);
    this.#lines.forEach(item => {
      this.push(item);
    })
    callback();
  }
}

module.exports = LineSplitStream;
