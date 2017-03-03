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

    if (objinput.error) callback(objinput.error, null);

    switch (objinput.fname) {
        case "get_full_accounts":
            try {
                temp2 = {
                    "id": 0,
                    "method": "call",
                    "params": [0, "get_full_accounts", [objinput.vaccount.split(' '), 'false']]
                }
            } catch (e) {
                callback(e, null);
            }
            break;

        case "get_ticker":
            try {
                temp2 = {
                    "id": '2',
                    "method": "call",
                    "params": [0, "get_ticker", objinput.vquote.split(' ')]
                };
            } catch (e) {
                callback(e, null);
            }
            break;

        case "get_objects":
            try {
                temp2 = {
                    "id": 0,
                    "method": "call",
                    "params": [0, "get_objects", [objinput.vobject.split(' ')]]
                };
            } catch (e) {
                callback(e, null);
            }
            break;

        case "get_account_history":
            try {
                temp2 = {
                    "id": '',
                    "method": "call",
                    "params": [3, "get_account_history", ['1.2.153811', 100, 100, 100]]
                };
            } catch (e) {
                callback(e, null);
            }
            break;

        case "transfer":
            try {
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
            } catch (e) {
                callback(e, null)
            }
            break;

        default:
            callback({
                error: `no function available: ${objinput.fname}`
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

    wss.on('close', (code) => {
        console.log('closed connection: ', code);
    });
};