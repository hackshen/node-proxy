const http = require('http');
const https = require('https');
const fs = require('fs');
const url = require('url');

http.createServer((request, response) => {
    const meta = url.parse(request.url);
    const opts = {
        hostname: meta.hostname,
        port: 80,
        path: meta.path,
        method: request.method,
        headers: request.headers
    }

    const proxyReq = http.request(opts, res => {
        response.writeHead(res.statusCode, res.headers);
        res.pipe(response)
    }).on('error', err => {
        response.writeHead(500, { 'content-type': 'text/plain' });
        response.end(err.message);
    });
    request.pipe(proxyReq)
}).listen(9999);
