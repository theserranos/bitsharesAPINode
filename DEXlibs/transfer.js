/**
 * transfer.js for bitsharesAPINode.
 * (c) 2017 TheSerranos.
 * This code is released under the 
 * terms of the MIT license. 
 */

var {
    Apis
} = require("graphenejs-ws")

var {
    ChainStore,
    FetchChain,
    PrivateKey,
    TransactionHelper,
    Aes,
    TransactionBuilder
} = require("graphenejs-lib");

// -- from config.js -- // 
var host = require('../config.js').ws.host

/**
 * Given txObj, try to execute a transaction
 * @param  {JSON}       txObj       [Contains prvKey, fromAccount, toAccount, memo(*), amount, asset]
 * @param  {Function}   callback    (error, transaction_details)
 * @return {JSON Object}
 */
module.exports = function(txObj, callback) {
    var self = this;
    this.host = host;
    this.apis = Apis.instance(this.host, true);
    this.privKey = txObj.privKey;
    this.pKey = PrivateKey.fromWif(txObj.privKey);
    this.fromAccount = txObj.fromAccount;
    this.memo = txObj.memo || null;
    this.memoSender = txObj.fromAccount
    this.toAccount = txObj.toAccount;
    this.amount = txObj.amount;
    this.asset = txObj.asset;
    this.chain = ChainStore;
    this.transaction = null;
    this.apis.init_promise
        .then(() => {
            return chain.init();
        })
        .then(() => {
            return Promise.all([
                FetchChain("getAccount", this.fromAccount),
                FetchChain("getAccount", this.toAccount),
                FetchChain("getAccount", this.memoSender),
                FetchChain("getAsset", this.asset)
            ]);
        })
        .then((res) => {
            var fromAccount = res[0];
            var toAccount = res[1]
            var memoSender = res[2]
            var asset_id = res[3].get('id');
            var tr = new TransactionBuilder();
            // if there's a memo
            if (this.memo != null) {
                let memoFromKey = memoSender.getIn(["options", "memo_key"]);
                let memoToKey = toAccount.getIn(["options", "memo_key"]);
                let nonce = TransactionHelper.unique_nonce_uint64();
                let memo_object = {
                    from: memoFromKey,
                    to: memoToKey,
                    nonce,
                    message: Aes.encrypt_with_checksum(
                        this.pKey,
                        memoToKey,
                        nonce,
                        memo)
                };

                tr.add_type_operation("transfer", {
                    fee: {
                        amount: 0,
                        asset_id: asset_id
                    },
                    from: fromAccount.get("id"),
                    to: toAccount.get("id"),
                    amount: {
                        amount: this.amount,
                        asset_id: asset_id
                    },
                    memo: memo_object
                });

                return tr;
            } else {
                tr.add_type_operation("transfer", {
                    fee: {
                        amount: 0,
                        asset_id: asset_id
                    },
                    from: fromAccount.get("id"),
                    to: toAccount.get("id"),
                    amount: {
                        amount: this.amount,
                        asset_id: asset_id
                    }
                });

                return tr;
            }
        })
        .then((tr) => {
            // Transaction; call to add fees fn.
            tr.set_required_fees();
            return tr;
        })
        .then((tr) => {
            // Transaction; call to add signer fn.
            tr.add_signer(this.pKey, this.pKey.toPublicKey().toPublicKeyString());
            return tr;
        })
        .then((tr) => {
            // Transaction; call to serialize fn.
            tr.serialize();
            return tr;
        })
        .then((tr) => {
            // Transaction; call to broadcast fn.
            return tr.broadcast();
        })
        .then((tx) => {
            // Store the response of the broadcasted transaction.
            this.transaction = tx[0];
            // Cancel subscriptions.
            return this.apis.db_api().exec('cancel_all_subscriptions', [this.apis.onUpdate, true])
        })
        .then(() => {
            // Close connection and return the response
            this.apis.close();
            callback(null, this.transaction)
        })
        .catch((err) => {
            callback(err, null)
        })
};

// <Example>
// var tx = require('route_to_transfer.js');
// 
// /* Data for the potential transaction */
// 
// var ptx = {
//    privKey: 'The_private_key',
//    fromAccount: 'account_name',
//    memo: 'memo_is_optional',
//    toAccount: 'send_to_account',
//    amount: 1, 
//    asset: 'Asset_to_send'
// };
// 
// tx(ox, function(err, msg) {
//      if (err) {
//          console.log('Error: ', err);
//      } else {
//          console.log('response OK: ', msg);
//      }
// });

/* -- end file -- */