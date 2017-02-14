/**
 *
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
    res.send(JSON.stringify({
        api: {
            name: 'codename',
            version: 'v1a'
        }
    }))
    res.end();
});

app.post('/api/usefunction/', (req, res) => {
    console.log(req.body);
    if (req.body != null) {
        try {
            handler.public(req.body.id, req.body.method, req.body.params, function(response) {
                res.send(response)
                res.end();
            })
        } catch (e) {
            res.send({
                'Error': 'Empty body'
            })
        }

    } else {
        res.send({
            error: 'empty body'
        })
        res.end();
    }
});

app.listen(3333, () => {
    console.log('Estamos alerta en 3333')
});