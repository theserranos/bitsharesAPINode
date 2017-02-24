/**
 * bitsharesAPINode main file.
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
        requested.fname = req.body.fname;
        requested.accountFrom = req.body.accountFrom;
        requested.version = 'v1a';
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

        route(aux, function(err, res) {
            if (err) {
                res.send(JSON.stringify(err));
                res.end();
            } else {
                res.send(JSON.stringify(res));
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