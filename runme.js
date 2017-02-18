/**
 * bitsharesAPINode main file.
 */
var app = require('express')()
var bodyParser = require('body-parser');
//var handler = require('./api');
var route = require('./DEXlibs/route.js');

const set = require('./config.js').api

// parsing JSON & application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));




app.post('/api/', (req, resPost) => {
    console.time('/api/'); console.log(req.body);
    var aux={
             
            fname:req.body.fname,
            accountFrom:req.body.accountFrom,
            version: 'v1a',
            vaccount: req.body.vaccount,
            vobject:req.body.vobject 
  
    };
  
   route(aux,function(err,res){
     if (err){console.log ('error :',err);
              resPost.send(JSON.stringify(err));
              resPost.end();
             }
     else{
 
        resPost.send(JSON.stringify(res));
        resPost.end();
  
         console.timeEnd('/api/')
     }
    });
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



function route (){
  console.log ('route function')

}