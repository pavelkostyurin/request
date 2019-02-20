const url = require('url');

module.exports = (opts, cb) => {
    const promise = new Promise((resolve, reject) => {
        opts = Object.assign({}, typeof opts === 'string' ? {url: opts} : opts);

        if (opts.url) Object.assign(opts, url.parse(opts.url));

        const lib = require(opts.protocol === 'http:' ? 'http' : 'https');
        lib.globalAgent.maxSockets = 45;

        const req = lib.request(opts, res => {

            if (res.statusCode < 200 || res.statusCode > 299) {
                reject(new Error(`Failed to get ${opts.url}, status code: ${res.statusCode}`));
            }

            res.setEncoding('utf8');
            let body = '';
            res.on('data', data => { body += data; });
            res.on('end', () => resolve({ ...res, body }));
        });

        req.on('socket', socket => {
            socket.setTimeout(opts.timeout || 60000);  
            socket.on('timeout', () => {
                socket.end();
                reject (new Error(`Request timed out: ${opts.url}`));
            });
        });
        
        req.on('error', error => reject(error));
        req.end();
    });

    if (cb && typeof cb == 'function') {
        promise.then(cb.bind(null, null), cb);
    }

    return promise;
}