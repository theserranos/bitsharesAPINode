module.exports = function(lib) {
  var webSocket = require('ws')
  
 console.log(lib); 
  vaccount='op3nalf';

   
  switch(lib.data.fname) {
        case "get_account_balances":
              
               var temp2= { "id": 0,"method": "call", "params": [0, "get_account_balances",[ vaccount ,[]]]}
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
       case "get_objects":
               var temp2= { "id": 0,"method": "call", "params": [0, "get_objects", [[req.query.vacc]]]}; break;  
      
        case "transfer":
                var test=transac('ẗransfer')  ;
                console.log(test) ;break;  
      
      
    default:
            res.send('------nothing found');
      break;
   
       // code block
}
  
     socketmanager(temp2, function(err, resp) 
        {if (err) {console.log('error'); } 
          else {console.log(resp);lib.result=resp;res.send('ppp')}
        })
  
  console.log(temp2);
  
 
  
 
  function socketmanager(arg, callback) {

   var wss = new webSocket('wss://bitshares.openledger.info/ws');
//   var wss = new webSocket('ws://rgbplex.com:8090');

    wss.on('open', () => {
        console.log('alf connected to:', wss.url);
        wss.send(JSON.stringify(arg));
    });

    wss.on('message', (data) => {
        console.log(' --- message received testalf '); //,JSON.parse(data).result)
         v=JSON.parse(data);
       if(v.error){ console.log(v.error.message)}
      else { console.log('---------------------------- received');}

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
  

};
  
 
  



   



