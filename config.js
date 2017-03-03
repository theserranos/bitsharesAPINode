/**
 * config.js for bitsharesAPINode
 * (c) 2017 TheSerranos.
 * This code is released under the 
 * terms of the MIT license. 
 */

var config = {};
// Secure WebSocket settings
// < - - >
// Change it to:
// Germany; 'wss://bitshares.openledger.info/ws'
// Hong Kong; 'wss://bit.btsabc.org/ws'
// Hong Kong; 'wss://openledger.hk/ws'
// Hangzhou, China; 'wss://bts.transwiser.com/ws'
// Hangzhou, China; 'wss://bitshares.dacplay.org:8089/ws'
// Toronto, Canada; 'wss://secure.freedomledger.com/ws'
// < - - > 
// Public testnet; 'wss://testnet.bitshares.eu/ws'
config.ws = {
    host: 'wss://node.testnet.bitshares.eu',
};
// api listen on port;
config.api = {
    port: 3333,
    code: {
    	name: 'bitsharesAPINode',
    	version: '0.0.3b'
    }
};

module.exports = config;