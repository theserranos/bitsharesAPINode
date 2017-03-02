var {Apis} = require("graphenejs-ws");
var {ChainStore, FetchChain, PrivateKey, TransactionHelper, Aes, TransactionBuilder} = require("graphenejs-lib");

/*
var objTx = {
    privKey: '',
    fromAccount: '',
    memo: '',
    toAccount: '',
    amount: 0,
    asset: ''
    }
*/
module.exports = function(objTx,callback) {
    let pKey = PrivateKey.fromWif(objTx.privKey);

    Apis.instance("wss://testnet.bitshares.eu/ws", true)
 // Apis.instance("wss://bitshares.openledger.info/ws", true)
        .init_promise.then((res) => {

            console.log("connected to:", res[0].network_name, "network");

            ChainStore.init().then(() => {

                let fromAccount = objTx.fromAccount;
                let memoSender = fromAccount;
                let memo = objTx.memo;
                let toAccount = objTx.toAccount;

                let sendAmount = {
                    amount: objTx.amount,
                    asset: objTx.asset
                }

                Promise.all([
                    FetchChain("getAccount", fromAccount),
                    FetchChain("getAccount", toAccount),
                    FetchChain("getAccount", memoSender),
                    FetchChain("getAsset", sendAmount.asset), 
                    FetchChain("getAsset", sendAmount.asset)
                ]).then((res) => {
                    // console.log("got data:", res);
                    let [fromAccount, toAccount, memoSender, sendAsset, feeAsset] = res;

                    // Memos are optional, but if you have one you need to encrypt it here
                    let memoFromKey ='';//xxx';// memoSender.getIn(["options", "memo_key"]);
                  //  console.log("memo pub key:", memoFromKey);
                    let memoToKey = '';//toAccount.getIn(["options", "memo_key"]);
                    let nonce = TransactionHelper.unique_nonce_uint64();

                    let memo_object = {
                        from: memoFromKey,
                        to: memoToKey,
                        nonce,
                        message: Aes.encrypt_with_checksum(
                            pKey,
                            memoToKey,
                            nonce,
                            memo
                        )
                    }

                    let tr = new TransactionBuilder();

                    tr.add_type_operation("transfer", {
                        fee: {
                            amount: 100,
                            asset_id: feeAsset.get("id")
                        },
                        from: fromAccount.get("id"),
                        to: toAccount.get("id"),
                        amount: {
                            amount: sendAmount.amount,
                            asset_id: sendAsset.get("id")
                        },
                        memo: memo_object
                    })
                    //
                    tr.set_required_fees()
                        .then(() => {
                            tr.add_signer(pKey, pKey.toPublicKey().toPublicKeyString());
                      //      tr.serialize();
                            console.log("serialized transaction:", tr.serialize());
                        // console.log("serialized transaction:", tr.broadcast());
                      
                      tr.broadcast()
                        .then((res)=>{
                          console.log(res);
                          callback(null,res)
                        })
                        .catch((err)=>{
                        console.log(err)
                      })
                      
                        
                        }) .catch((err)=>{
                        console.log('---- tr.add_signe ',err)
                      })
                }).catch((err)=>{
                  callback(err,null)
                        console.log('2222222---- tr.add_signe ',err)
                      });
            });
        })
}