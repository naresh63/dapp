import { useEffect,useState } from "react";
const { ethers } = require("ethers");

function Buy({state}) {
   
  const [name,setName] = useState('');
  const [msg, setMsg] = useState('');

  const buyChai = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const amount = { value: ethers.utils.parseEther("0.001") };
    const transaction = await contract.buyChai(name, msg, amount);
    await transaction.wait();
    console.log("Transaction is done");
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="p-5 form-container" >
         <form onSubmit={buyChai}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="name"
              placeholder="Enter Your Name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <input
              type="text"
              className="form-control"
              value={msg}
              onChange={(e)=>setMsg(e.target.value)}
              id="message"
              placeholder="Enter Your Message"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!state.contract}
          >
            Pay
          </button>
        </form>

        </div>

    </div>
  )
}

export default Buy