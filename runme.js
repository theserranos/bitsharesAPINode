/**
 * bitshares-api-node
 * (c) Copyright 2016 by theSerranos
 * Licensed under MIT
 */

var app = require('express')()
var bodyParser = require('body-parser');
var handler = require('./api/');

// parsing JSON & application/x-www-form-urlencoded

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/api/', (req, res) => {
    handler.public.api(req)
        .then((response) => {
            res.send(response)
            res.end()
        });
});

app.post('/api/usefunction/', (req, res) => {
    if (req.body) {
        try {
            handler.public.getFunction(req.body.fname)
                .then((response) => {
                    res.send(response);
                    res.end();
                })
                .catch((error) => {
                    res.send(error)
                    res.end();
                })
        } catch (e) {
            res.send({
                error: 'fname key not found'
            })
        }
    } else {
        res.send({
            error: 'empty body'
        })
        res.end();
    }

})

app.listen(3333, () => {
    console.log('Estamos alerta en 3333')
});
