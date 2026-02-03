import test from 'node:test';
import assert from 'node:assert/strict';
import { compareByKey, parseNumeric, resolveTableElements } from '../src/lib/standings-utils.js';

test('parseNumeric returns Infinity for invalid values', () => {
  assert.equal(parseNumeric(undefined), Infinity);
  assert.equal(parseNumeric(null), Infinity);
  assert.equal(parseNumeric(''), Infinity);
  assert.equal(parseNumeric('nope'), Infinity);
});

test('parseNumeric parses numeric strings', () => {
  assert.equal(parseNumeric('3.5'), 3.5);
  assert.equal(parseNumeric(2), 2);
});

test('compareByKey sorts numeric keys', () => {
  const a = { win_div: '2.0' };
  const b = { win_div: '3.0' };
  assert.ok(compareByKey(a, b, 'win_div', 1) < 0);
  assert.ok(compareByKey(a, b, 'win_div', -1) > 0);
});

test('compareByKey sorts string keys', () => {
  const a = { division: 'AFC East' };
  const b = { division: 'AFC West' };
  assert.ok(compareByKey(a, b, 'division', 1) < 0);
});

test('resolveTableElements returns null without table or tbody', () => {
  const fakeDoc = { querySelector: () => null };
  assert.equal(resolveTableElements(fakeDoc), null);

  const fakeTable = { querySelector: () => null, querySelectorAll: () => [] };
  const fakeDoc2 = { querySelector: () => fakeTable };
  assert.equal(resolveTableElements(fakeDoc2), null);
});

test('resolveTableElements returns table parts when present', () => {
  const fakeTbody = { querySelectorAll: () => [] };
  const fakeTable = {
    querySelector: (sel) => (sel === 'tbody' ? fakeTbody : null),
    querySelectorAll: () => [{ dataset: { key: 'division' } }]
  };
  const fakeDoc = { querySelector: () => fakeTable };
  const result = resolveTableElements(fakeDoc);
  assert.ok(result);
  assert.equal(result.tbody, fakeTbody);
  assert.equal(result.headerCells.length, 1);
});
