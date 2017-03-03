
var ws=require('ws');
var transfer=require('./transferbts.js');

/* var wss = new ws('ws://rgbplex.com:8090') //habra que pasarlo como parametro'
             wss.on('open', () => {
                var temp2= { "id": 0,"method": "call", "params": [0, "get_objects", [[ '1.6.1'] ]]};
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
*/
function callback(req,res){console.log('alf callback',res)}

      var objTx = {} 
              
              
               // var test=transac('ẗransfer')  ;
              transfer(objTx, function(err, tx){
                if(err){
                  callback(err, null)
                }
                else{
                  callback(null, tx);
                }
              });
