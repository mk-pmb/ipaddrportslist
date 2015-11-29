/*jslint indent: 2, maxlen: 80, node: true *//* -*- tab-width: 2 -*- */
'use strict';

var ipAddrPortsList = require('ipaddrportslist'), tests,
  stats = { cnt: 0, sxs: 0, err: 0 },
  jsonify = JSON.stringify.bind(JSON);

tests = [
  require('./basics.json')
];


stats.inc = function (err) {
  if (err) {
    if (err.join === tests.join) { err = err.join('\n  '); }
    console.error('-ERR ' + err);
  }
  stats.cnt += 1;
  stats[err ? 'err' : 'sxs'] += 1;
};


function testCompare(qa) {
  var r, expected;
  if (!qa) { return; }
  if (qa.join === tests.join) { return qa.forEach(testCompare); }
  try {
    r = ipAddrPortsList(qa.q);
  } catch (err) {
    r = err;
  }
  if (r instanceof Error) {
    if (qa.e === true) { return stats.inc(); }
    r = '!! ' + String(r.message || r);
  }
  if ((r && r.join) === tests.join) {
    r = r.map(function (x) { return (x.port + '@' + x.host); });
  }
  r = jsonify(r);
  expected = (qa.e ? '!! ' + qa.e : jsonify(qa.a));
  if (r === expected) { return stats.inc(); }
  return stats.inc([jsonify(qa.q), '-> ' + r, '!= ' + expected]);
}

testCompare(tests);
if (stats.cnt < 1) { stats.inc('No tests processed'); }
if (stats.err !== 0) {
  console.error('-ERR ' + stats.err);
  process.exit(Math.max(stats.err, 1));
}
console.log('+OK ' + stats.sxs);
