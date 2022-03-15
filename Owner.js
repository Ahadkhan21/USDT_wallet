import React, { useState } from 'react'
import './App.css'
import Web3 from 'web3'
import token_abi from './abi_token.json'
// import wallet_abi from './abi_wallet.json'


function Owner() {

    const [events,setEvents] = useState([]);
    const [balance,setBalance] = useState();

    const GetBalance=(e)=> {
        e.preventDefault();
        contract_Token.methods.balanceOf("0x765DBf076Ba1B30088353A2227922Fe06849BcA0").call().then(function(bal){
            console.log(bal);
            setBalance(bal/10**18);
        })   
    }


    const transactionHistory = async() =>{
        contract_Token.events.Transfer({
            filter: {myIndexedParam: '0x765DBf076Ba1B30088353A2227922Fe06849BcA0'}, // Using an array means OR: e.g. 20 or 23
            fromBlock: 0
        }, function(error){  })
        .on("connected", function(subscriptionId){
            console.log(subscriptionId);
        })
        .on('data', (event)=>{
            if (event.returnValues.to === '0x765DBf076Ba1B30088353A2227922Fe06849BcA0'){
            setEvents((events) => [...events,{blockNumber:event.blockNumber, 
                returnValues:event.returnValues,type:"DEBIT"}])}  
            else{setEvents((events) => [...events,{blockNumber:event.blockNumber, 
                returnValues:event.returnValues, type:"CREDIT"}])}           
        })
        .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
            console.log(error)
        })
    };

    const web3 = new Web3(window.ethereum);
    const token_Add= "0x02Ae61BEaeeB0E67a8493Ff808153586D4705DD1";
    const contract_Token =  new web3.eth.Contract(token_abi, token_Add);
    // console.log(contract_Token)

    // const wallet_Add= "0x24154EE6e0FE4586aaA5A3D44c4901B6cCCefb53";    
    // const contract_Wallet =  new web3.eth.Contract(wallet_abi, wallet_Add);
    // console.log(contract_Wallet)

    


    return(
        <div>   
            {/* Balance button */}
            <h3>ADMIN PAGE</h3>
            <br></br>
            <div>
                <h4 id ="balance">Balance: {balance}</h4>
                {/* <input type="text"  placeholder='address' value={newAdd} onChange={(e) => setNewAddress(e.target.value)} ></input> */}
                <button type='submit' className='btn' onClick={GetBalance}><h4>My Balance</h4></button>
            </div>

            <div>
                <button type='submit' className='btn' onClick={transactionHistory}><h4>Transaction History</h4></button>    
            </div>
            
            <div id="Table">
                    <table id='transactions'>
                        <tr>
                        <th>Block</th>
                        <th>Type</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Value</th>
                        </tr>

                        {events.map((val, key) => {
                        return (
                            <tr key={key}>
                            <td>#{val['blockNumber']}</td>
                            <td>{val['type']}</td>
                            <td>{val['returnValues']['from']}</td>
                            <td>{val['returnValues']['to']}</td>
                            <td>{val['returnValues']['value']/10**18 + " USDT"}</td>
                            </tr>
                        )
                        })}
                    </table>
                </div>
        </div>
    )}

    export default Owner
