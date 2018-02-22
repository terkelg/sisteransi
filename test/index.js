'use strict';

const test = require('tape');
const ansi = require('../src');

test('basic', t => {
  t.plan(6);
  t.equal(typeof ansi, 'object');
  let expect = ['cursor', 'scroll', 'erase', 'beep', 'clear'];
  expect.forEach(x => t.equal(x in ansi, true));
});

test('cursor', t => {
  t.plan(13);
  let c = ansi.cursor;
  t.equal(typeof c, 'object');
  t.equal(typeof c.to, 'function');
  t.equal(typeof c.move, 'function');
  t.equal(typeof c.up, 'function');
  t.equal(typeof c.down, 'function');
  t.equal(typeof c.forward, 'function');
  t.equal(typeof c.backward, 'function');
  t.equal(c.to(2, 2), '\u001B[3;3H');
  t.equal(c.move(1, 4), '\x1b[1C\x1b[4B');
  t.equal(c.forward(1, 4), '\x1b[1C');
  t.equal(c.backward(1, 4), '\x1b[1D');
  t.equal(c.up(1, 4), '\x1b[1A');
  t.equal(c.down(1, 4), '\x1b[1B');
});

test('scroll', t => {
  t.plan(3);
  let s = ansi.scroll;
  t.equal(typeof s, 'object');
  let expect = ['up', 'down']
  expect.forEach(x => t.equal(x in s, true));
});

test('erase', t => {
  t.plan(10);
  let e = ansi.erase;
  t.equal(typeof e, 'object');
  let expect = ['screen', 'up', 'down', 'line', 'lineEnd', 'lineStart', 'lines'];
  expect.forEach(x => t.equal(x in e, true));
  t.equal(typeof e.lines, 'function');
  t.equal(e.lines(2), '\x1b[2K\x1b[1A\x1b[2K\x1b[G');
});
