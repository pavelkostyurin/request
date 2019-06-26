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
- supports post requests with x-www-form-urlencoded data
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
  .catch(e => console.log(e));
```

### async/await

```js
const finer = require('finer');

(async () => {
    try {
        const { statusCode } = await finer('http://example.com');
        console.log(statusCode); // 200
    } catch (e) {
        console.log(e);
    }
})();
```

### POST

For `POST` use option `{ method: 'POST' }`


```js
const finer = require('finer');

let opts = {
    url: 'http://httpbin.org/post',
    method: 'POST'
  };

(async () => {
    try {
        const { body } = await finer(opts);
        console.log(JSON.parse(body).url); // http://httpbin.org/post
    } catch (e) {
        console.log(e);
    }
})();
```

### x-www-form-urlencoded

To make request with `x-www-form-urlencoded` data use `opts.form` with `{ method: 'POST' }`


```js
const finer = require('finer');

let opts = {
    url: 'http://somewebsi.te/submit',
    method: 'POST',
    form: {
    	user: 'username',
        passwd: 'password'
    }
  };

(async () => {
    try {
        const { body } = await finer(opts);
    } catch (e) {
        console.log(e);
    }
})();
```

### timeout

Default value is 60 seconds.
For custom timeout use option `{ timeout: value }`

```js
const finer = require('finer');

let opts = {
    url: 'http://no-response.whatsoever', // Server not responding
    timeout: 5000
  };

finer(opts)
  .then(res => console.log(res))
  .catch(e => console.log(e)); // Request timed out: http://no-response.whatsoever
```