import { cursor } from '../dist/index.js';

if (typeof cursor.up(1) !== 'string') {
  console.error('dist smoke test failed: cursor.up(1) did not return a string');
  process.exit(1);
}

console.log(`dist ok on ${process.version}`);
