const url = require('url');

module.exports = (options, callback) => {
    const promise = new Promise((resolve, reject) => {
        options = Object.assign({}, typeof options === 'string' ? {url: options} : options);

        if (options.url) Object.assign(options, url.parse(options.url));

        const lib = require(options.protocol === 'http:' ? 'http' : 'https');
        lib.globalAgent.maxSockets = 45;

        const request = lib.request(options, response => {
            
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject(new Error(`Failed to get ${options.url}, status code: ${response.statusCode}`));
            }

            const body = [];
            response.on('data', chunk => body.push(chunk));
            response.on('end', () => resolve({...response, body: body.join('')}));
        });

        request.on('error', error => reject(error));
        request.end();
    })

    if (callback && typeof callback == 'function') {
        promise.then(callback.bind(null, null), callback);
    }

    return promise;
}