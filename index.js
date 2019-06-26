const url = require('url');
const querystring = require('querystring');

module.exports = (opts, cb) => {
    const promise = new Promise((resolve, reject) => {
        opts = Object.assign({}, typeof opts === 'string' ? { url: opts } : opts);
        if (opts.url) Object.assign(opts, url.parse(opts.url));

        let headers = {};
        if (opts.headers) Object.keys(opts.headers).forEach(i => (headers[i.toLowerCase()] = opts.headers[i]))
        opts.headers = headers;

        let postData;
        if (opts.form) {
            postData = typeof opts.form === 'string' ? opts.form : querystring.stringify(opts.form);
            opts.headers['content-type'] = 'application/x-www-form-urlencoded';
            opts.headers['content-length'] = postData.length;
        }

        const lib = require(opts.protocol === 'http:' ? 'http' : 'https');
        lib.globalAgent.maxSockets = 45;

        const req = lib.request(opts, res => {
            if ((res.statusCode < 200 || res.statusCode > 299) && res.statusCode !== 302) {
                reject(new Error(`Failed to get ${opts.url}, status code: ${res.statusCode}`));
            }
            res.setEncoding('utf8');
            let body = '';
            res.on('data', data => body += data);
            res.on('end', () => resolve({ ...res, body }));
        });

        req.on('socket', socket => {
            socket.setTimeout(opts.timeout || 60000);
            socket.on('timeout', () => {
                socket.end();
                reject(new Error(`Request timed out: ${opts.url}`));
            });
        });

        req.on('error', e => reject(e));
        if (postData) req.write(postData);
        req.end();
    });

    if (cb && typeof cb == 'function') {
        promise.then(cb.bind(null, null), cb);
    }

    return promise;
}