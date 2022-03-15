import React, { useState } from 'react'
import './App.css'
import QRCode from 'react-qr-code';
import Web3 from 'web3';
import token_abi from './abi_token.json'
// import wallet_abi from './abi_wallet.json'

import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';


function Client() {

    const [events,setEvents] = useState([]);

    // const account = useWeb3React()
    // console.log(account.account)
    
// listen 
    const transactionHistory = async() =>{
        let cnt=0, temp=0, latestBlock=0;
        contract_Token.events.Transfer({
            filter: {myIndexedParam: '0x765DBf076Ba1B30088353A2227922Fe06849BcA0'}, // Using an array means OR: e.g. 20 or 23
            fromBlock: 0
        }, function(error,event){
            
            if (event.blockNumber>latestBlock){latestBlock=event.blockNumber;}
            cnt+=1

            if (cnt>temp && event.blockNumber>latestBlock){window.alert("Payment successful")}
            temp=cnt;
            console.log(cnt);
            console.log(event.returnValues.from);
            console.log(event.returnValues.to);
            console.log(event.returnValues.value);
        })
        .on("connected", function(subscriptionId){
            console.log(subscriptionId);
        })
        .on('data', (event)=>{
            setEvents((events) => [...events,{blockNumber:event.blockNumber, 
                returnValues:event.returnValues}])                
        })
        .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
            console.log(error)
        })
    };

// COPY ADDRESS BUTTON

function myFunction() {
    /* Get the text field */
    var copyText = document.getElementById("address");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
  
    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
  }

  



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
            <div>
                <p>Amount to pay</p>
                <h1>5 USDT</h1>
                <Popup trigger={<button className='btn'>Pay</button>} position="right center">
                    <div>
                        {/* Owner QR code */}
                        <QRCode className='QR' value="0x765DBf076Ba1B30088353A2227922Fe06849BcA0" /> 
                        <input className='field' id='address' value="0x765DBf076Ba1B30088353A2227922Fe06849BcA0"></input>
                        {/* The button used to copy the text  */}
                        <button className='small_btn' onclick={myFunction}>Copy</button>
                        
                    </div>
                </Popup>
                <button type='submit' className='btn' onClick={transactionHistory}><h4>Transaction History</h4></button>
                {
                    <table id='transactions'>
                        <tr>
                        <th>Block</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Value</th>
                        </tr>

                        {events.map((val, key) => {
                            
                        return (
                            <tr key={key}>
                            <td>#{val['blockNumber']}</td>
                            <td>{val['returnValues']['from']}</td>
                            <td>{val['returnValues']['to']}</td>
                            <td>{val['returnValues']['value']/10**18 + " USDT"}</td>
                            </tr>
                        )
                        })}
                    </table>
                }
            </div>
            
        </div>

    )}

    export default Client


