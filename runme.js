/**
 *
 */

var app = require('express')()
var webSocket = require('ws')



app.get('/api/usefunction/', function(req, res) {
    console.log(req.query.vacc);

  switch(req.query.fname) {
        case "get_account_balances":
                // var temp2= { "id": 0,"method": "call", "params": [0, "get_account_balances",['1.2.153554',['1.3.1','1.3.0']]]}
               var temp2= { "id": 0,"method": "call", "params": [0, "get_account_balances",[ req.query.vacc ,[]]]}
                console.log(temp2);
                // var temp2= { "id": 0,"method": "call", "params": [0, "get_account_balances",[['1.2.153554','1.2.153554'],[]]]}
                  break;
      
        case "get_named_account_balancesx":
                // var temp2= { "id": 0,"method": "call", "params": [0, "get_account_balances",['1.2.153554',['1.3.1','1.3.0']]]}
               var temp2= { "id": 0,"method": "call", "params": [0, "get_named_account_balances", [req.query.vacc ,[]]]}
      
      
    case "list_assets":
             var temp2= { "id": 0,"method": "call", "params": [0, "list_assets",[10,10]]}
              break;

     case "lookup_accounts":
               var temp2= { "id": 0,"method": "call", "params": [0, "lookup_accounts",['op3nalf',1]]}
               var temp2= { "id": 0,"method": "call", "params": [0, "lookup_accounts",[req.query.vacc,1]]}
                break;  

       case "get_account_by_name":
               var temp2= { "id": 0,"method": "call", "params": [0, "get_account_by_name",['op3nalf']]}
                break;  
      
      
    default:
            res.send('------nothing found');
        break;
   
       // code block
}
  
   
  
  
  
    socketmanager(temp2, function(err, resp) 
        {if (err) {res.send('error'); res.end();} 
          else {res.send(resp);res.end();}
        })

});


app.listen(3333, () => {
    console.log('--Estamos alerta en 3333')
});


///tests




function socketmanager(arg, callback) {

    var wss = new webSocket('wss://bitshares.openledger.info/ws');

    wss.on('open', () => {
        console.log('alf connected to:', wss.url);
        wss.send(JSON.stringify(arg));
    });

    wss.on('message', (data) => {
        console.log(' --- message received testalf '); //,JSON.parse(data).result)
         v=JSON.parse(data);
       if(v.error){ console.log(v.error.message)}
      else { console.log('----------------------------',v);}

        callback(null, JSON.parse(data))
    });
    wss.on('error', (error) => {
        console.log(' +++' + error);
        callback(error, null)
    });
    wss.on('close', (vdata) => {
        console.log(' -- cerrada conexion', vdata)
    });

}


//testin my branch 