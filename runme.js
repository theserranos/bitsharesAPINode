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
app.all('/api/', (req, res) => {
    console.log(`${new Date()} - /api/`);
    res.send(JSON.stringify(set.code));
    res.end();
});

app.post('/api/query/', (req, res) => {
    console.log(`${new Date()} - /api/query/`);
    var self = this;
    var requested = {};
    this.requested = requested;
    this.res = res;
    try {
        requested.fname = req.body.fname;
        requested.accountFrom = req.body.accountFrom;
        requested.vaccount = req.body.vaccount;
        requested.vobject = req.body.vobject;
        requested.privKey = req.body.privKey;
        requested.fromAccount = req.body.fromAccount;
        requested.memo = req.body.memo;
        requested.toAccount = req.body.toAccount;
        requested.amount = req.body.amount;
        requested.asset = req.body.asset;
        requested.vquote = req.body.vquote;
    } catch (e) {
        requested.error = e;
    } finally {
        route(requested, function(err, data) {
            if (err) {
                self.res.send(JSON.stringify(err));
                self.res.end();
            } else {
                self.res.send(JSON.stringify(data));
                self.res.end();
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