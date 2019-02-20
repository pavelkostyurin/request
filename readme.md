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
- default timeout is 60 seconds, unless other specified

### install

```
npm i finer
```

### callback

```js
const finer = require('finer');

finer('http://example.com', (err, res) => {
  if (err) console.log(err);
  console.log(res.statusCode); // 200
});
```

### promise

```js
const finer = require('finer');

finer('http://example.com')
  .then(res => console.log(res.statusCode)) // 200
  .catch(err => console.log(err));
```

### async/await

For `POST` use option `{ method: 'POST' }`.

```js
const finer = require('finer');

let opts = {
    url: 'http://httpbin.org/post',
    method: 'POST'
  };

(async () => {
    try {
        const {body} = await finer(opts);
        console.log(JSON.parse(body).url); // http://httpbin.org/post
    } catch (err) {
        console.log(err);
    }
})();
```

### timeout

Default value is 60 seconds.
For custom timeout use option `{ timeout: value }`.

```js
const finer = require('finer');

let opts = {
    url: 'http://no-response.whatsoever', // Server not responding
    timeout: 5000
  };

finer(opts)
  .then(res => console.log(res))
  .catch(err => console.log(err)); // Request timed out: http://no-response.whatsoever
```