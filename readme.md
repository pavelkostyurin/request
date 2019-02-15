# finer

[![install size][size-img]][size-url] [![node][node-img]][node-url]

[size-img]: https://packagephobia.now.sh/badge?p=finer
[size-url]: https://packagephobia.now.sh/result?p=finer
[node-img]: https://img.shields.io/node/v/finer.svg?style=flat
[node-url]: https://github.com/pavelkostyurin/request

Tiny HTTP-client without dependencies. Stupid, simple, no fancy stuff.

### features

- returns a Promise if no callback specified
- supports HTTPS
- supports options
- does not support redirect


### install

```
npm i finer
```

### callback

```js
const request = require('finer');

request('http://example.com', (err, res) => {
  if (err) console.log(err);
  console.log(res.statusCode); // 200
});
```

### promise

```js
const request = require('finer');

request('http://example.com')
  .then(res => console.log(res.body)) // body
  .catch(err => console.log(err));
```

### async/await

For `POST` use option `{ method: 'POST' }`.
Schedule a go-CD pipeline:

```js
const request = require('finer');

let auth = 'Basic ' + new Buffer.from('user:password').toString('base64');
let opts = {
  host: 'gocdhostexample.net',
  port: 8154,
  path: '/go/api/pipelines/deploy/schedule',
  method: 'POST',
  headers: {
    'Authorization': auth,
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.go.cd.v1+json',
    'X-GoCD-Confirm': true
  }
};

(async () => {
  try {
    const res = await request(opts);
    console.log(res.body); // Request to schedule pipeline deploy accepted
  } catch (err) {
    console.log(err.message);
  }
})();
```
