/**
 * route.js for bitsharesAPINode
 * (c) 2017 TheSerranos.
 * This code is released under the 
 * terms of the MIT license. 
 */
var ws = require('ws');
var transfer = require('./transfer.js');
const vwssserver = require('../config.js').ws

module.exports = function(objinput, callback) {

    var temp2 = null;

    switch (objinput.fname) {

        case "get_full_accounts":
            temp2 = {
                "id": 0,
                "method": "call",
                "params": [0, "get_full_accounts", [objinput.vaccount.split(' '), 'false']]
            };
            break;

        case "get_ticker":

            temp2 = {
                "id": '2',
                "method": "call",
                "params": [0, "get_ticker", objinput.vquote.split(' ')]
            };
            break;

        case "get_objects":

            temp2 = {
                "id": 0,
                "method": "call",
                "params": [0, "get_objects", [objinput.vobject.split(' ')]]
            };
            break;

        case "get_account_history":

            temp2 = {
                "id": '',
                "method": "call",
                "params": [3, "get_account_history", ['1.2.153811', 100, 100, 100]]
            };
            break;

        case "transfer":

            var objTx = {
                privKey: objinput.privKey,
                fromAccount: objinput.fromAccount,
                memo: objinput.memo,
                toAccount: objinput.toAccount,
                amount: objinput.amount,
                asset: objinput.asset
            };

            transfer(objTx, function(err, tx) {
                if (err) {
                    callback(err, null)
                } else {
                    callback(null, tx);
                }
            });
            break;

        default:
            callback({
                error: 'no function available'
            }, null)
    }

    var wss = new ws(vwssserver.host);
    var wssOutput = null;

    wss.on('open', () => {
        wss.send(JSON.stringify(temp2));
    });

    wss.on('message', (data) => {
        wssOutput = JSON.parse(data);
        wss.terminate();

        if (wssOutput.error) {
            callback(wssOutput, null)
        } else {
            callback(null, wssOutput)
        }
    });

    wss.on('error', (error) => {
        wssOutput.error = {};
        wssOutput.error.code = -5;
        wssOutput.error.reason = 'WebSocket tunnel to bitshares node has failed';
        wss.terminate();
        callback(wssOutput, null);
    });

    wss.on('close', (vdata) => {
      console.log('closed connection: ', vdata);
    });
};