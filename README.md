# @zayyeh/request

Tiny HTTP-client without dependencies.

### features

- returns a Promise if no callback specified
- supports HTTPS
- supports options
- does not support redirect


### install

```
npm i @zayyeh/request
```

### callback

```js
const request = require('@zayyeh/request');

request('http://www.example.com', (error, response) => {
  if (error) console.log(error);
  console.log(response.statusCode); // 200
});
```

### promise

```js
const request = require('@zayyeh/request');

request('http://example.com')
  .then(response => console.log(response.statusCode)) // 200
  .catch(error => console.log(error));
```

### async/await

For `POST` use option `{ method: 'POST' }`.
Schedule a go-CD pipeline:

```js
const request = require('@zayyeh/request');

let auth = 'Basic ' + new Buffer.from('test-user:defaultpassword').toString('base64');
let options = {
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
    const response = await request(options);
    console.log(response.body); // Request to schedule pipeline deploy accepted
  } catch (error) {
    console.log(error.message);
  }
})();
```
