'use strict';

const { util, erase, cursor } = require('./src');

console.log('--- test 1 ---');

process.stdin.write('Line 1\n');
process.stdin.write('Line 2'+erase.line);
process.stdin.write(cursor.left);
process.stdin.write('Line 3\n');

console.log('--- test 2 ---');

process.stdin.write('Line 1\n');
process.stdin.write('Line 2\n');
process.stdin.write('Line 3\n');
process.stdin.write('Line 4\n');
process.stdin.write(cursor.prevLine(2));
process.stdin.write('third \n');
process.stdin.write(cursor.down(2));
process.stdin.write('last \n');

console.log('--- test 3 ---');

process.stdin.write(util.beep);
