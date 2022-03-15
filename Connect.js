import React, { useEffect } from 'react'
import { injected } from "./Connection/Connectors"
import { useWeb3React } from "@web3-react/core"
import './App.css'


import Client from './Client'
import Owner from './Owner'


export const MetaMaskProvider = () => {
  const { activate, account, active, deactivate } = useWeb3React()

    async function connect() {
        try {
          await activate(injected)
          localStorage.setItem('isWalletConnected', true)
        } catch (error) {
          console.log(error)
        }
    }

    async function disconnect() {
        try {
          deactivate()
          localStorage.setItem('isWalletConnected', false)
        } catch (error) {
          console.log(error)
        }
    }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
        
        if (localStorage?.getItem('isWalletConnected') === 'true') {
            try {
                await activate(injected)
                localStorage.setItem('isWalletConnected', true)
            } 
            catch (error) {
                console.log(error)
            }
        }
    }
    // eslint-disable-next-line
    connectWalletOnPageLoad()
    localStorage.clear();
    // eslint-disable-next-line
}, [])

  return (
    <div className="App">
    
      {/* Header */}
      <header className="App-header">
        <h3>USDT Wallet</h3>
      </header>

      <div className='row_01'>
        <button onClick={connect} className="btn"><h4>Connect to MetaMask</h4></button>
        {active ? <span>Connected with <b>{account}</b> <button onClick={disconnect} className="btn"><h4>Disconnect</h4></button> 
        
          {account !== "" && <Client/>} //Enter Owner address

          {account === "" && <Owner/>} // Enter Owner address
        
        </span> : <span></span>}

      </div>


      <div className="App-footer">
        <h3>Neosoft Technologies pvt. ltd.</h3>
      </div>
        
    </div>
  )
}
