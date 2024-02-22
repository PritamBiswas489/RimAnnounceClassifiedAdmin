import React from "react";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { deleteSubLocation } from "services/admin.service";
import EditSubLocationModal from "components/EditSubLocationModal/EditSubLocationModal";

export default function SubLocationsActions({ reload, row }) {
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);
  const deleteSubLocationHandle = async () =>{
    const con = confirm('Are you sure delete this location?')
    if(con === true){
        const response = await deleteSubLocation(row.id)
        if(response?.data?.status === 200){
         alert('Delete location successfully done')
         reload()
        }else{
           alert('Failed to delete location')
        }
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
             e.preventDefault()
             deleteSubLocationHandle()
          } }>
            Delete
          </Dropdown.Item>
          <Dropdown.Item href="#pablo" onClick={handleModalShow}>
            Edit
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
    <EditSubLocationModal reload={reload} row={row}  show={showModal} handleClose={handleModalClose} />
    </>
  );
}
