/**
 * bitsharesAPINode main file.
 * (c) 2017 TheSerranos.
 * This code is released under the 
 * terms of the MIT license. 
 */
var app = require('express')()
var bodyParser = require('body-parser');
var route = require('./DEXlibs/route.js');
var set = require('./config.js').api

// parsing JSON & application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/api/', (req, res) => {
    var requested = {};
    try {
        aux=req.body;
 
    } catch (e) {
        requested.error = e;
    } finally {

        route(aux, function(err, resp) {
            if (err) {
                res.send(JSON.stringify(err));
                res.end();
            } else {
                res.send(JSON.stringify(resp));
                res.end();
            }
        });
    }
});

app.listen(set.port, (err) => {
    if (err) {
        throw err;
    } else {
        console.log('Listening on: ', set.port);
    }
});

/* -- end . file -- */
