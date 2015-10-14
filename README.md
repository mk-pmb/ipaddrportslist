ipaddrportslist
===============
Explaining the supported values for that server config option about which
interfaces and ports to listen on, or that bot config option about which
servers to connect to.

* Listen on a single port on localhost: Just put the number.
  * If types are a concern, supply any integer or a digit-only string.

* Listen on any/all interfaces: `*:` + port number(s).
  * Specifies that you don't care about interfaces. Usually that results
    in listening on all available interfaces.
  * For multiple port numbers, see below.

* For multiple values, separate them with at least one space.
  * You can safely put one comma before the spaces if you like to, or even
    between them. Spaces are any combination of `" \t\r\n"` = U+0020 space,
    U+0009 horizontal tab, U+000D carriage return and U+000A line feed.

* Don't listen at all: `-` (Just put a hyphen-minus.)
  * Might be useful on servers that have additinal other means of interaction.
  * When encountered in a multi-value list, ignore the remaining values.

* Listen on specific interface and ports: Put the interface (as hostname,
  `IP.v4.addr.ess`, `[IP:v6:addr:ess]` or `*`), a colon (`:`) and the port(s).
  * Separate multiple ports with comma (`,`), no spaces. Any space would
    separate the port from the interface, so it will be parsed as just a
    port number, as described above.
  * To include all ports of the previous address value, put a single
    `_`  U+005F low line) as the first port number.
  * To temporarily exclude (disable) a port number, put a single
    `_` (U+005F low line) directly after it.



JavaScript Parser
-----------------
An `ipaddrportslist` parser in JavaScript (ECMAScript) is provided in
`parser.js`. For detailed examples see [the tests](test/parse.node.js).
[Basic example](example/echosrv.node.js):

```js
var net = require('net'), ipaddrportslist = require('ipaddrportslist'),
  listenAddrs = ipaddrportslist(process.env.HELLOPORT || 2002);

listenAddrs.forEach(function listenOnAddr(lsnAddr) {
  var srv = net.createServer(), descr;
  /* ... handlers setup ... */
  srv.listen(lsnAddr.port, lsnAddr.host);
});
```




















License
-------
MIT



-*- coding: utf-8, tab-width: 2 -*-
