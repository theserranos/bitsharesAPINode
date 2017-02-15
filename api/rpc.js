/**
 * @name bitnode.js
 */

var http = require('http');
var crypto = require('crypto');
var set = require('../config.js').rpc;

var rpc = {};

rpc.config = {
    host: set.host,
    port: set.port
};

rpc.client = function(id, method, params, callback) {

    var payload = JSON.stringify({
        id: id || Math.floor((Math.random() * 65536) + 0),
        method: method,
        params: params,
    });
    // request options
    var options = {
        host: this.config.host,
        port: this.config.port,
        path: '/',
        method: 'POST',
        headers: {
            'jsonrpc': '2.0',
            'content-length': Buffer.byteLength(payload)
        }
    };
    //
    var proxy = http.request(options, (response) => {
        // store the data's chunk in a buffer
        var body = '';
        // push chunks to buffer
        response.on('data', (chunk) => {
            body += chunk;
        })

        response.on('end', () => {

            callback(null, body)
        })

        response.on('error', (err) => {
            callback(err, null)
        })
    });

    proxy.on('error', (err) => {
        callback(err, null)
    });
    proxy.write(payload);
    proxy.end();
}

module.exports = rpc;

// ** end file **