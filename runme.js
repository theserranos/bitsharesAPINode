/**
 * bitsharesAPINode main file.
 */
var app = require('express')()
var bodyParser = require('body-parser');
var handler = require('./api');
const set = require('./config.js').api

// parsing JSON & application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/api/', (req, res) => {
    console.time('/api/')
    res.send(JSON.stringify({
        api: {
            name: 'bitsharesAPINode',
            version: 'v1a'
        }
    }))
    res.end();
    cosole.timeEnd('/api/')
});

app.post('/api/wsocket/', (req, res) => {
    console.time('/api/wsocket/')
    try {
        handler.wsocket(req.body.id, req.body.method, req.body.params, (response) => {
            res.send(response)
            res.end();
        })
    } catch (e) {
        res.send({
            error: e
        })
        res.end();
    }
    console.timeEnd('/api/wsocket/');
});

app.post('/api/rpc/', (req, res) => {
    console.time('/api/rpc/');
    try {
        handler.rpc.client(req.body.id, req.body.method, req.body.params, (error, response) => {
            if (error) {
                throw error;
            } else {
                res.send(response);
                res.end();
            }
        })
    } catch (e) {
        res.send({
            error: e
        })
        res.end();
    }
    console.timeEnd('/api/rpc/');
});

app.listen(set.port, (err) => {
    if (err) {
        throw err;
    } else {
        console.log('Listening on: ', set.port);
    }
});
