/**
 * accountHistory.js
 * Get the recent history from a given account.
 */
 
var { Apis } = require("graphenejs-ws");
var { ChainStore, FetchChain} = require("graphenejs-lib");
var host = require('../config.js').ws.host;

/**
 * @param  {JSON}   	data     	[]
 * @param  {Function} 	callback 	[]
 * @return {JSON}            		[]
 */
module.exports = function(data, callback) {
	// @private {String} 	data.account
	// @private {Number}	data.limit
    this.accountName = data.account;
    this.limit = data.limit;
    this.host = host;
    this.apis = Apis.instance(this.host, true);
    this.chain = ChainStore;
    //
    this.apis.init_promise
        .then(() => {
            this.chain.init()
        })
        .then(() => {
        	return FetchChain("getAccount", this.accountName)
        })
        .then((account)=>{
        	var accountID = (account.toJSON()).id;
        	return  FetchChain("fetchRecentHistory", accountID)
        })
        .then((history)=>{
        	callback(null, history);
        })
        .catch((err) => {
            console.log(err);
            callback(err, null);
        })

};
