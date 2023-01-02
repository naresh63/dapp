import './App.css';
import abi from './contract/chai.json';
import Buy from './conponents/Buy'
import Memos from './conponents/Memos';

import { useEffect,useState } from "react";
const { ethers } = require("ethers");


function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x46436dcb1b29b111a00bb61f5475b420ef1104eb";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        
        }else{
          alert("Please install metamask");
        }

      } catch (error) {
        console.log(error);
      }
    }
    connectWallet();
  },[])

console.log(state)

   
   
    
  return (
    <div>

       <h2 className='text-center'> Donate for your social-contribute</h2>
      <p className='text-center'> Connected Account -<span className='acc-label'> {account}</span> </p>
        <Buy state={state}/>
        <Memos state={state}/>
    </div>
  );
}

export default App;
