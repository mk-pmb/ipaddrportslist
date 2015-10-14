/*jslint indent: 2, maxlen: 80, node: true *//* -*- tab-width: 2 -*- */
'use strict';

var net = require('net'), ipaddrportslist = require('ipaddrportslist'),
  listenAddrs = ipaddrportslist(process.env.HELLOPORT || 2002);

listenAddrs.forEach(function listenOnAddr(lsnAddr) {
  var srv = net.createServer(), descr;
  descr = lsnAddr.port + '@' + (lsnAddr.host || '<any>');
  srv.on('connection', function hello(sock) {
    sock.end('Hi ' + sock.remoteAddress + ', welcome to ' + descr + '!\r\n');
  });
  srv.on('listening', console.log.bind(console, 'listening on ' + descr));
  console.log('setup ' + descr + ': ...');
  srv.listen(lsnAddr.port, lsnAddr.host);
});
