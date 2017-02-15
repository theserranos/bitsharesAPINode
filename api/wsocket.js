/**
 *
 * 
 */

var webSocket = require('ws');
var processOut = require('./processOut')
var wsServer = require('../config.js').ws;

var public = function(id, method, params, callback) {

    var self = this;
    this.request = {};
    this.request.id = id || Math.floor((Math.random() * 65536) + 0);
    this.request.method = method || 'call';
    this.request.params = params;
    // los datos necesarios los almacenamos en this.request, si:
    // - id: si no es especificado, se genera un <id> aleatorio por defecto, 
    // - method: si no es especificado se usa 'call' por defecto
    // 
    //  Si necesitamos conocer  la accion a realizar la obtenemos del array params[1]
    //  
    // this.fname = params[1];

    var wss = new webSocket(wsServer);

    wss.on('open', () => {
        wss.send(JSON.stringify(this.request));
    });

    wss.on('message', (msg) => {

        wss.terminate();
        
        processOut(self.request.method, msg)
            .then((output) => {
                callback(output)
            })
            .catch((error) => {
                callback(error);
            });
    });

    wss.on('error', (err) => {
        callback({
            Error: err
        })
    });

}

module.exports = public;