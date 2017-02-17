//import {Apis} from "graphenejs-ws";
const { Apis } = require("graphenejs-ws");
const {ChainStore, FetchChain, PrivateKey, TransactionHelper, Aes, TransactionBuilder} =require("graphenejs-lib");
//const { Aes, FetchChain, PrivateKey, TransactionHelper, TransactionBuilder } = require("graphenejs-lib");

//var privKey = "5KBuq5WmHvgePmB7w3onYsqLM8ESomM2Ae7SigYuuwg8MDHW7NN";
var privKey = "5JJpm1G7NGUQoLaanMy6qRVD7N5edWWcE1nMTG6eLo6SnTYVBjD";// smbodyveryniu
//var privKey = "GPH5Abm5dCdy3hJ1C5ckXkqUH2Me7dXqi9Y7yjn9ACaiSJ9h8r8mL";// smbodyveryniu

       
let pKey = PrivateKey.fromWif(privKey);
//  pKey="5JpmdFCM1njEqnNTfa485b96LyWc396hxrVoUTAfvZ59P5zbrPh";

//Apis.instance("wss://testnet.bitshares.eu/ws", true)
Apis.instance("http://rgbplex.com:8090", true)
//Apis.instance("wss://bitshares.openledger.info/ws", true)
.init_promise.then((res) => {
    console.log("connected to:", res[0].network_name, "network");

    ChainStore.init().then(() => {

        let fromAccount = "someoneveryn3w";
        let memoSender = "someoneveryn3w";
        let memo = "Testing transfer from node.js";

        let toAccount = "somebodyn1ce";

        let sendAmount = {
            amount: 2000000,
            asset: "BTS"
        }

        Promise.all([
                FetchChain("getAccount", fromAccount),
                FetchChain("getAccount", toAccount),
                FetchChain("getAccount", memoSender),
                FetchChain("getAsset",sendAmount.asset),
                FetchChain("getAsset", sendAmount.asset)
            ]).then((res)=> {
                // console.log("got data:", res);
                let [fromAccount, toAccount, memoSender, sendAsset, feeAsset] = res;

                // Memos are optional, but if you have one you need to encrypt it here
                let memoFromKey = memoSender.getIn(["options","memo_key"]);
                console.log("memo pub key:", memoFromKey);
                let memoToKey = toAccount.getIn(["options","memo_key"]);
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

                let tr = new TransactionBuilder()

                tr.add_type_operation( "transfer", {
                    fee: {
                        amount: 0,
                        asset_id: feeAsset.get("id")
                    },
                    from: fromAccount.get("id"),
                    to: toAccount.get("id"),
                    amount: { amount: sendAmount.amount, asset_id: sendAsset.get("id") },
                    memo: memo_object
                } )

                tr.set_required_fees().then(() => {
                    tr.add_signer(pKey, pKey.toPublicKey().toPublicKeyString());
                    console.log("serialized transaction:", tr.serialize());
                    tr.broadcast();
                })
            });
    });
});
