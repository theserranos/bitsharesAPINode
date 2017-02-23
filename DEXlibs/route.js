var ws=require('ws');
var transfer=require('./transfer.js');
const vwssserver = require('../config.js').ws

module.exports = function(objinput,callback) {
  //console.log(objinput);
   switch(objinput.fname) {
        case "get_full_accounts":
     
            temp2= { "id": 0,"method": "call", "params": [0, "get_full_accounts",[objinput.vaccount.split(' '),'false']]};
            console.log('---faccounts---',temp2); 
            break;
     
        
         case "get_ticker":
                var aux=objinput.vquote.split(' ') 
            //    var temp2= { "id": 2,"method": "call", "params": [0, "get_ticker",[ '1.3.1', '1.3.0' ]]};
                 var temp2= { "id": '2',"method": "call", "params": [0, "get_ticker",aux]}; 
                console.log('------get_ticker---', temp2);
                break;   
 
       
       case "get_objects":
          
                console.log(" ========= get_objects " ,objinput.vobject.split(' ') );
             var temp2= { "id": 0,"method": "call", "params": [0, "get_objects", [ objinput.vobject.split(' ') ]]};
          //    var temp2= { "id": 0,"method": "call", "params": [0, "get_objects", [["1.3.1044","1.3.888" ]]]};
      
                break;  
         case "get_account_history": 
          
          //      console.log(" ========= get_account_history " ,objinput.vobject.split(' ') );
             var temp2= { "id": '',"method": "call", "params": [3, "get_account_history", ['1.2.153811',100,100,100]]};
            break;
       
          
       
      
        case "transfer":
                 
               var objTx = {
                privKey: objinput.privKey , //'5JJpm1G7NGUQoLaanMy6qRVD7N5edWWcE1nMTG6eLo6SnTYVBjD',
                fromAccount: objinput.fromAccount,// 'someoneveryn3w',
                memo: objinput.memo, //'DSDDFDF',
                toAccount: objinput.toAccount,//'somebodyn1ce',
                amount: objinput.amount,//100000,
                asset:objinput.asset //'BTS'
                } 
              
              
               // var test=transac('ẗransfer')  ;
              transfer(objTx, function(err, tx){
                if(err){
                  callback(err, null)
                }
                else{
                  callback(null, tx);
                }
              });
              //console.log(test) 
              ;break;  
      
      
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
                      // console.log(data);
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
  
 
  



   



