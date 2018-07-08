const {ESC} = require('./util');
const {up, left} = require('./cursor');

module.exports = {
  screen: `${ESC}2J`,
  up: `${ESC}1J`,
  down: `${ESC}J`,
  line: `${ESC}2K`,
  lineEnd: `${ESC}K`,
  lineStart: `${ESC}1K`,
  lines(count) {
    let clear = '';
    for (let i = 0; i < count; i++)
      clear += this.line + (i < count - 1 ? up() : '');
    if (count)
      clear += left;
    return clear;
  }
}
