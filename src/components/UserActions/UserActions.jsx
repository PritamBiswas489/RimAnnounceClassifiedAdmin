import React from "react";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import PriceModal from "components/PriceModal/PriceModal";
import { updateUserWallet } from "services/admin.service";
import AdminTransactions from "components/AdminTransactions/AdminTransactions";
import UserTransactions from "components/UserTransactions/UserTransactions";
import { deleteUser } from "services/admin.service";
import { changeStatus } from "services/admin.service";

export default function UserActions({ row, reload }) {
  const [showModal, setShowModal] = useState(false);
  const [showAdminTransactionModal, setShowAdminTransactionModal] = useState(false);
  const [showUserTransactionModal, setShowUserTransactionModal] = useState(false);
  const [isUserActive,setIsUserActive] = useState(row.status === 'ACTIVE' ?  true: false)
 

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);
  const submitPrice = async (amt) => {
        
        const response = await updateUserWallet(row.id,amt)
        if (response?.data?.status === 200) {
          alert('Wallet Successfully updated')
          reload()
        }else{
          alert('Process failed')
        }

  }

  function handleAdminTransactionModalToggle(){
    setShowAdminTransactionModal(!showAdminTransactionModal);
  }
  function handleUserTransactionModalToggle(){
    setShowUserTransactionModal(!showUserTransactionModal);
  }
  async function removeUserPermanently(){
    const con  = confirm('Are you sure?')
    if(con === true){
      const response = await deleteUser(row.id)
      if (response?.data?.status === 200) {
        reload()
        alert('User Successfully deleted')
      }else{
        alert('Process failed')
      }

    }
    
  }
  async function statusChange (){
    const response = await changeStatus(row.id,isUserActive)
    if (response?.data?.status === 200) {
      setIsUserActive(!isUserActive)
      alert('Process success')
    }else{
      alert('Process failed')
    }
    

  }
  return (
    <>
      <div className="btn-group">
        <Dropdown>
          <Dropdown.Toggle
            aria-expanded={false}
            aria-haspopup={true}
            data-toggle="dropdown"
            id={`navbarDropdownMenuLink${row.id}`}
            variant="default"
            className="btn btn-sm btn-warning m-0"
          >
            <span className="no-icon">Actions</span>
          </Dropdown.Toggle>
          <Dropdown.Menu aria-labelledby={`navbarDropdownMenuLink${row.id}`}>
            <Dropdown.Item href="#pablo" onClick={(e) =>{
                  e.preventDefault();
                  removeUserPermanently()

            } }>
              Delete
            </Dropdown.Item>
            <Dropdown.Item href="#pablo" onClick={(e) =>{
               e.preventDefault()
               statusChange()
            } }>
           {isUserActive ? 'Deactivate' : 'Activate' }   
            </Dropdown.Item>
            <Dropdown.Item href="#pablo" onClick={handleModalShow}>
              Recharge
            </Dropdown.Item>

            <Dropdown.Item href="#pablo" onClick={(e) =>{ e.preventDefault(); handleUserTransactionModalToggle()} }>
              User transaction
            </Dropdown.Item>

            <Dropdown.Item href="#pablo" onClick={(e) =>{ e.preventDefault(); handleAdminTransactionModalToggle()} }>
              Admin transaction
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <PriceModal row={row} submitPrice = {submitPrice} show={showModal} handleClose={handleModalClose} />

      <AdminTransactions 
      row={row} 
      show={showAdminTransactionModal} 
      onHide={handleAdminTransactionModalToggle} />

      <UserTransactions  row={row} show={showUserTransactionModal} onHide={handleUserTransactionModalToggle} />
    </>
  );
}
