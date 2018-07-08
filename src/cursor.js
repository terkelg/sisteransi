const {ESC} = require('./util');

module.exports = {
  to(x, y) {
    if (!y) return `${ESC}${x + 1}G`;
    return `${ESC}${y + 1};${x + 1}H`;
  },
  move(x, y) {
    let ret = '';

    if (x < 0) ret += `${ESC}${-x}D`;
    else if (x > 0) ret += `${ESC}${x}C`;

    if (y < 0) ret += `${ESC}${-y}A`;
    else if (y > 0) ret += `${ESC}${y}B`;

    return ret;
  },
  up: (count = 1) => `${ESC}${count}A`,
  down: (count = 1) => `${ESC}${count}B`,
  forward: (count = 1) => `${ESC}${count}C`,
  backward: (count = 1) => `${ESC}${count}D`,
  nextLine: (count = 1) => `${ESC}E`.repeat(count),
  prevLine: (count = 1) => `${ESC}F`.repeat(count),
  left: `${ESC}G`,
  hide: `${ESC}?25l`,
  show: `${ESC}?25h`
}
