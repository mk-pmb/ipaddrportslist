/*jslint indent: 2, maxlen: 80, node: true *//* -*- tab-width: 2 -*- */
'use strict';

var EX = function ipaddrportslist(list) { return EX.parse(list); };

EX.defaultHost = 'localhost';


EX.EBadAddr = function EBadAddr(addr) {
  return Error.call(this, 'ipaddrportslist: unsupported address format: ' +
    String(addr));
};
EX.EBadAddr.prototype = new Error();


EX.parse = function (list) {
  var prevPorts = '', addrs = [];
  if ('number' === typeof list) {
    addrs = [ { host: EX.defaultHost, port: list } ];
    return EX.copyFirstAddr(addrs);
  }
  list = String(list);
  if (list === '') { throw new EX.EBadAddr('<empty string>'); }
  list.replace(/\S+/g, function addAddr(word, ports, host) {
    word = String(word).replace(/,+$/, '');
    if (word === '-') { list = ''; }
    if (!list) { return; }
    ports = word.match(/^(\S+:|)([0-9_,]+)$/);
    if (!ports) { throw new EX.EBadAddr(word); }
    word = ports[1];
    host = (word || EX.defaultHost).replace(/:$/, '');
    if (host === '*') { host = ''; }
    ports = ports[2].replace(/^,*/, '').replace(/^_(,|$)/, prevPorts + ',');
    ports = (' ' + ports.replace(/,/g, '  ') + ' ').replace(/ [0-9]+_ /g, '');
    prevPorts = ports.trim();
    ports = ports.replace(/[0-9]+/g, function addPort(port) {
      addrs[addrs.length] = { host: host, port: Number(port) };
      return '';
    }).trim();
    if (ports) { throw new EX.EBadAddr(word + ports); }
  });
  return EX.copyFirstAddr(addrs);
};


EX.copyFirstAddr = function (arr) {
  var first = (arr && arr[0]);
  arr.host = (first ? first.host : null);
  arr.port = (first ? first.port : null);
  return arr;
};














module.exports = EX;
