import { useEffect,useState } from "react";
const { ethers } = require("ethers");

function Memos({state}) {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
    };
    contract && memosMessage();
  }, [contract]);

  return (
    <div>
      
      <table className="table table-dark table-striped">
        <tbody>
          {
            memos.map((ele,ind)=>{
              return(
                <tr key={ind}>
                   <td>  {ele.name}</td>
                   <td>  {new Date(ele.timestamp*1000).toLocaleString()}</td>
                   <td>  {ele.message}</td>
                   <td>  {ele.from}</td>
                </tr>
              )
            })
          }

        </tbody>
      </table>

    </div>
  )
}

export default Memos