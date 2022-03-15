import React, { useState } from 'react'
import './App.css'
import QRCode from 'react-qr-code';
import Web3 from 'web3';
import token_abi from './abi_token.json'
// import wallet_abi from './abi_wallet.json'

import Popup from 'reactjs-popup';

function Client() {

    const [events,setEvents] = useState([]);
    
// listen 
    const transactionHistory = async() =>{
       
        contract_Token.events.Transfer({
            filter: {myIndexedParam: ' '}, // Enter the parameters to filter events
            fromBlock: 0
        }, function(error,event){
            
            if (event.blockNumber>latestBlock){latestBlock=event.blockNumber;}
            cnt+=1
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


    const web3 = new Web3(window.ethereum);
    const token_Add= " ";//Enter Token Contract Address
    const contract_Token =  new web3.eth.Contract(token_abi, token_Add);
    
    return(

        <div>
            {/* Balance button */}
            <div>
                <p>Amount to pay</p>
                <h1>5 USDT</h1>
                <Popup trigger={<button className='btn'>Pay</button>} position="right center">
                    <div>
                        {/* Owner QR code */}
                        <QRCode className='QR' value=" " /> //Enter account address to get QR code 
                        <input className='field' id='address' value=" "></input> //Enter account address
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


