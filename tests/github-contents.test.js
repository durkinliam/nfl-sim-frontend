import test from 'node:test';
import assert from 'node:assert/strict';
import { decodeContentsJson } from '../src/lib/github-contents.js';

test('decodeContentsJson parses base64 json arrays', () => {
  const payload = [{ team: 'NE', win_div: 2.1 }];
  const content = Buffer.from(JSON.stringify(payload), 'utf-8').toString('base64');
  const contents = { encoding: 'base64', content };
  assert.deepEqual(decodeContentsJson(contents), payload);
});

test('decodeContentsJson returns null for non-arrays', () => {
  const content = Buffer.from(JSON.stringify({ team: 'NE' }), 'utf-8').toString('base64');
  const contents = { encoding: 'base64', content };
  assert.equal(decodeContentsJson(contents), null);
});

test('decodeContentsJson returns null for missing content', () => {
  assert.equal(decodeContentsJson(null), null);
  assert.equal(decodeContentsJson({ encoding: 'base64' }), null);
  assert.equal(decodeContentsJson({ encoding: 'utf-8', content: 'abc' }), null);
});
