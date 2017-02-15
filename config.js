var config = {};

// RPC HTTP settings
config.rpc = {
	host: 'rgbplex.com',
	port: 8090
}
// Secure WebSocket settings
config.ws = {
	host: 'wss://bitshares.openledger.info/ws',
}
// api isten on port;
config.api = {
	port: 3333
}

module.exports = config;
