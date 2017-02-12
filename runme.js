/**
 *
 */

var app = require('express')()
var webSocket = require('ws')

function out(arg, callback) {

    var wss = new webSocket('wss://bitshares.openledger.info/ws');

    wss.on('open', () => {
        console.log('alf connected to:', wss.url);
        wss.send(JSON.stringify(arg));
    });

    wss.on('message', (data) => {
        console.log(' --- ', JSON.parse(data).result);
        wss.terminate();
        callback(null, JSON.parse(data).result)
    });
    wss.on('error', (error) => {
        console.log(' +++' + error);
        callback(error, null)
    });
    wss.on('close', (vdata) => {
        console.log(' -- cerrada conexion', vdata)
    });
}

// fin funcion out 

app.get('/api/', function(req, res) {
    res.send('Welcome to api v1')
    res.end()
})

app.get('/api/get_accounts/', function(req, res) {
    console.log(req.query);
    var temp = {
        "id": req.query.id,
        "method": "call",
        "params": [0, "get_accounts", [
            ["op3nalf"]
        ]]
    };

    out(temp, function(err, resp) {
        if (err) {
            res.send('error');
            res.end();
        } else {
            res.send(resp);
            res.end();
        }
    })

});

//get full accounts

app.get('/api/get_full_accounts/', function(req, res) {
    console.log(req.query);
    var temp = {
        "id": req.query.id,
        "method": "call",
        "params": [0, "get_full_accounts", [
            ["1.2.0"], false
        ]]
    };


    out(temp, function(err, resp) {
        if (err) {
            res.send('error');
            res.end();
        } else {
            res.send(resp);
            res.end();
        }
    })

});


app.get('/api/lookup_asset_symbols/', function(req, res) {
    console.log(req.query);
    var temp = {
        "id": req.query.id,
        "method": "call",
        "params": [0, "lookup_asset_symbols", [
            ["1.3.0"]
        ]]
    };
    out(temp, function(err, resp) {
        if (err) {
            res.send('error');
            res.end();
        } else {
            res.send(resp);
            res.end();
        }
    })

});



app.listen(3333, () => {
    console.log('Estamos alerta en 3333')
});

//testin my branch 