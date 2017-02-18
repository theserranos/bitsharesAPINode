var ws=require('ws');
const vwssserver = require('../config.js').ws

module.exports = function(objinput,callback) {
  //console.log(objinput);
   switch(objinput.fname) {
        case "get_account_balances":
             
              // var temp2= { "id": 0,"method": "call", "params": [0, "get_account_balances",[ objinput.vaccount ,[]]]}
             console.log(" ========= split " ,objinput.vaccount.split(' ') );
       var temp2= { "id": 0,"method": "call", "params": [0, "get_account_balances",objinput.vaccount.split(' ')]}
                 console.log('gaccb---',temp2);
               break;
      
        case "get_named_account_balances":
        console.log(" ========= split " ,objinput.vaccount.split(' ') );
                // var temp2= { "id": 0,"method": "call", "params": [0, "get_account_balances",['1.2.153554',['1.3.1','1.3.0']]]}
               var temp2= { "id": 0,"method": "call", "params": [0, "get_named_account_balances",objinput.vaccount.split(' ')]}
                var temp2= { "id": 0,"method": "call", "params": [0, "get_named_account_balances",["op3nalf"]]}
                break;
        case "list_assets":
             var temp2= { "id": 0,"method": "call", "params": [0, "list_assets",[10,10]]}
              break;

         case "lookup_accounts":
               var temp2= { "id": 0,"method": "call", "params": [0, "lookup_accounts",['op3nalf',1]]}
               var temp2= { "id": 0,"method": "call", "params": [0, "lookup_accounts",[objinput.vaccount,1]]}
                break;  

        case "get_account_by_name":
               var temp2= { "id": 0,"method": "call", "params": [0, "get_account_by_name",[objinput.vaccount.split()]]}
                break;  
       case "get_objects":
       console.log('param  ----- ' ,objinput.vobject);
       
                console.log(" ========= split " ,objinput.vobject.split(' ') );
             var temp2= { "id": 0,"method": "call", "params": [0, "get_objects", [ objinput.vobject.split(' ') ]]};
          //    var temp2= { "id": 0,"method": "call", "params": [0, "get_objects", [["1.3.1044","1.3.888" ]]]};
      
                break;  
      
        case "transfer":
               // var test=transac('ẗransfer')  ;
                console.log(test) ;break;  
      
      
         default:
            console.log('------nothing found');
            callback({error:'no function available'},null)
}
           var wss = new ws(vwssserver.host) //habra que pasarlo como parametro'
             wss.on('open', () => {
                     console.log('alf connected to:', wss.url);
                     wss.send(JSON.stringify(temp2));
             });
  
               wss.on('message', (data) => {
                  console.log(' --- message received testalf '); //,JSON.parse(data).result)
                  var  v=JSON.parse(data);
                  wss.terminate();
                 if(v.error){ console.log(v.error.message);callback(v,null)}
                 else { console.log('---------------------------- received');
                       console.log(data);
                        callback(null, JSON.parse(data))
                      }

                  
                  });
  
                wss.on('error', (error) => {
                      console.log(' +++' + error);
                      new Error (error)
                   });
               wss.on('close', (vdata) => {
                  console.log(' -- cerrada conexion', vdata)
                });

};
  
 
  



   



