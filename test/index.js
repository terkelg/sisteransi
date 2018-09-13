'use strict';

const test = require('tape');
const ansi = require('../src');

test('basic', t => {
  t.plan(8);
  t.equal(typeof ansi, 'object');
  let expect = ['cursor', 'scroll', 'erase', 'beep', 'clear'];
  expect.forEach(x => t.equal(x in ansi, true));
  t.equal(typeof ansi.beep, 'string');
  t.equal(typeof ansi.clear, 'string');
});

test('cursor', t => {
  t.plan(33);
  let c = ansi.cursor;
  t.equal(typeof c, 'object');
  t.equal(typeof c.to, 'function');
  t.equal(typeof c.move, 'function');
  t.equal(typeof c.up, 'function');
  t.equal(typeof c.down, 'function');
  t.equal(typeof c.forward, 'function');
  t.equal(typeof c.backward, 'function');
  t.equal(typeof c.nextLine, 'function');
  t.equal(typeof c.prevLine, 'function');
  t.equal(typeof c.left, 'string');
  t.equal(typeof c.hide, 'string');
  t.equal(typeof c.show, 'string');
  t.equal(c.to(0), '\x1b[1G');
  t.equal(c.to(2, 2), '\u001B[3;3H');
  t.equal(c.move(1, 4), '\x1b[1C\x1b[4B');
  t.equal(c.up(), '\x1b[1A');
  t.equal(c.up(1), '\x1b[1A');
  t.equal(c.up(2), '\x1b[2A');
  t.equal(c.up(0), '\x1b[0A');
  t.equal(c.down(), '\x1b[1B');
  t.equal(c.down(1), '\x1b[1B');
  t.equal(c.down(2), '\x1b[2B');
  t.equal(c.down(0), '\x1b[0B');
  t.equal(c.forward(), '\x1b[1C');
  t.equal(c.forward(2), '\x1b[2C');
  t.equal(c.forward(0), '\x1b[0C');
  t.equal(c.backward(), '\x1b[1D');
  t.equal(c.backward(2), '\x1b[2D');
  t.equal(c.backward(0), '\x1b[0D');
  t.equal(c.nextLine(), '\x1b[E');
  t.equal(c.nextLine(2), '\x1b[E\x1b[E');
  t.equal(c.prevLine(), '\x1b[G\x1b[A');
  t.equal(c.prevLine(2), '\x1b[G\x1b[A\x1b[A');
});

test('scroll', t => {
  t.plan(9);
  let s = ansi.scroll;
  t.equal(typeof s, 'object');
  t.equal(typeof s.up, 'function');
  t.equal(typeof s.down, 'function');
  t.equal(s.up(), `\x1b[S`);
  t.equal(s.up(2), `\x1b[S\x1b[S`);
  t.equal(s.up(0), ``);
  t.equal(s.down(), `\x1b[T`);
  t.equal(s.down(2), `\x1b[T\x1b[T`);
  t.equal(s.down(0), ``);
});

test('erase', t => {
  t.plan(15);
  let e = ansi.erase;
  t.equal(typeof e, 'object');
  t.equal(typeof e.screen, 'string');
  t.equal(typeof e.up, 'function');
  t.equal(typeof e.down, 'function');
  t.equal(typeof e.line, 'string');
  t.equal(typeof e.lineEnd, 'string');
  t.equal(typeof e.lineStart, 'string');
  t.equal(typeof e.lines, 'function');
  t.equal(e.up(), `\x1b[1J`);
  t.equal(e.up(2), `\x1b[1J\x1b[1J`);
  t.equal(e.up(0), ``);
  t.equal(e.down(), `\x1b[J`);
  t.equal(e.down(2), `\x1b[J\x1b[J`);
  t.equal(e.down(0), ``);
  t.equal(e.lines(2), '\x1b[2K\x1b[1A\x1b[2K\x1b[G');
});
