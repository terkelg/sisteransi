import { beep, erase, cursor } from './src/index.ts';

console.log('--- test 1 ---');

process.stdout.write('Line 1\n');
process.stdout.write('Line 2' + erase.line);
process.stdout.write(cursor.left);
process.stdout.write('Line 3\n');

console.log('--- test 2 ---');

process.stdout.write('Line 1\n');
process.stdout.write('Line 2\n');
process.stdout.write('Line 3\n');
process.stdout.write('Line 4\n');
process.stdout.write(cursor.prevLine(2));
process.stdout.write('third \n');
process.stdout.write(cursor.down(2));
process.stdout.write('last \n');

console.log('--- test 3 ---');

process.stdout.write(beep);
