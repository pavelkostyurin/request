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
        const response = await finer(opts);
        console.log(JSON.parse(response.body).url); // http://httpbin.org/post
    } catch (err) {
        console.log(err);
    }
})();
```
