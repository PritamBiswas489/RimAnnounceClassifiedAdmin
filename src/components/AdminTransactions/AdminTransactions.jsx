import { getDateString } from "config/utility";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { getAdminTransactions } from "services/admin.service";

const AdminTransactions = ({  row, show, onHide }) => {
  const [loading,setLoading]  = useState(true);
  const [transactionList, setTransactionList] = useState([]);
  const [transactionListMeta, setTransactionListMeta] = useState([]);
 

  const data = [
    { id: 1, name: "John Doe", age: 30 },
    { id: 2, name: "Jane Smith", age: 25 },
  ];

  const getTransactionist = async () => {
    let response = await getAdminTransactions(row.id);
    if (response?.data?.status === 200) {
      setLoading(false);
      setTransactionList(response.data.data.records);
      setTransactionListMeta(response.data.data.meta);
    } else {
      setLoading(false);
      alert(response?.data.error?.message);
    }
  };
  useEffect(()=>{
    if(show === true){
      getTransactionist()
    }
  },[show, row.id])

  useEffect(()=>{
    console.log(transactionList)
    console.log(transactionListMeta)

  },[transactionList,transactionListMeta])
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Admin transaction for user "{row?.name}"</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {loading && <h2>Loading.........</h2> }
      {!loading && <table className="table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactionList.length >  0 ? (
            transactionList.map((dData,dIndex)=>( <tr>
              <td>{dData.amount} MRU</td>
              <td>{getDateString(dData?.createdAt)}</td>
            </tr>))
           ): 'No transaction found'}

            
            
          </tbody>
        </table>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default AdminTransactions;
