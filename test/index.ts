import { test } from 'node:test';
import assert from 'node:assert/strict';

import * as ansi from '../src/index.ts';
import { cursor, scroll, erase, beep, clear } from '../src/index.ts';

test('basic', () => {
  assert.equal(typeof ansi, 'object');
  for (const key of ['cursor', 'scroll', 'erase', 'beep', 'clear']) {
    assert.equal(key in ansi, true);
  }
  assert.equal(typeof beep, 'string');
});

test('cursor', () => {
  const c = cursor;
  assert.equal(typeof c, 'object');
  assert.equal(typeof c.to, 'function');
  assert.equal(typeof c.move, 'function');
  assert.equal(typeof c.up, 'function');
  assert.equal(typeof c.down, 'function');
  assert.equal(typeof c.forward, 'function');
  assert.equal(typeof c.backward, 'function');
  assert.equal(typeof c.nextLine, 'function');
  assert.equal(typeof c.prevLine, 'function');
  assert.equal(typeof c.left, 'string');
  assert.equal(typeof c.hide, 'string');
  assert.equal(typeof c.show, 'string');
  assert.equal(typeof c.save, 'string');
  assert.equal(typeof c.restore, 'string');
  assert.equal(c.to(0), '\x1b[1G');
  assert.equal(c.to(2, 2), '\x1b[3;3H');
  assert.equal(c.move(1, 4), '\x1b[1C\x1b[4B');
  assert.equal(c.up(), '\x1b[1A');
  assert.equal(c.up(1), '\x1b[1A');
  assert.equal(c.up(2), '\x1b[2A');
  assert.equal(c.up(0), '\x1b[0A');
  assert.equal(c.down(), '\x1b[1B');
  assert.equal(c.down(1), '\x1b[1B');
  assert.equal(c.down(2), '\x1b[2B');
  assert.equal(c.down(0), '\x1b[0B');
  assert.equal(c.forward(), '\x1b[1C');
  assert.equal(c.forward(2), '\x1b[2C');
  assert.equal(c.forward(0), '\x1b[0C');
  assert.equal(c.backward(), '\x1b[1D');
  assert.equal(c.backward(2), '\x1b[2D');
  assert.equal(c.backward(0), '\x1b[0D');
  assert.equal(c.nextLine(), '\x1b[E');
  assert.equal(c.nextLine(2), '\x1b[E\x1b[E');
  assert.equal(c.prevLine(), '\x1b[F');
  assert.equal(c.prevLine(2), '\x1b[F\x1b[F');
  assert.equal(c.save, '\x1b7');
  assert.equal(c.restore, '\x1b8');
});

test('scroll', () => {
  const s = scroll;
  assert.equal(typeof s, 'object');
  assert.equal(typeof s.up, 'function');
  assert.equal(typeof s.down, 'function');
  assert.equal(s.up(), `\x1b[S`);
  assert.equal(s.up(2), `\x1b[S\x1b[S`);
  assert.equal(s.up(0), ``);
  assert.equal(s.down(), `\x1b[T`);
  assert.equal(s.down(2), `\x1b[T\x1b[T`);
  assert.equal(s.down(0), ``);
});

test('erase', () => {
  const e = erase;
  assert.equal(typeof e, 'object');
  assert.equal(typeof e.screen, 'string');
  assert.equal(typeof e.up, 'function');
  assert.equal(typeof e.down, 'function');
  assert.equal(typeof e.line, 'string');
  assert.equal(typeof e.lineEnd, 'string');
  assert.equal(typeof e.lineStart, 'string');
  assert.equal(typeof e.lines, 'function');
  assert.equal(e.up(), `\x1b[1J`);
  assert.equal(e.up(2), `\x1b[1J\x1b[1J`);
  assert.equal(e.up(0), ``);
  assert.equal(e.down(), `\x1b[J`);
  assert.equal(e.down(2), `\x1b[J\x1b[J`);
  assert.equal(e.down(0), ``);
  assert.equal(e.lines(2), '\x1b[2K\x1b[1A\x1b[2K\x1b[G');
});

test('clear', () => {
  const c = clear;
  assert.equal(typeof c, 'object');
  assert.equal(typeof c.screen, 'string');
});
