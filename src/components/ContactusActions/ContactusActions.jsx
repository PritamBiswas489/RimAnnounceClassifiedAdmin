import React,{useState} from "react";
import { Dropdown } from "react-bootstrap";
import { deleteContactUs } from "services/admin.service";
import SendContactUsEmail from "components/SendContactUsEmail/SendContactUsEmail";

export default function ContactusActions({ reload, row }) {
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const deleteContactUsHandle = async () =>{
    const con = confirm('Are you sure delete this message?')
    if(con === true){
        const response = await deleteContactUs(row.id)
        if(response?.data?.status === 200){
         alert('Delete location successfully done')
         reload()
        }else{
           alert('Failed to delete message')
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
             deleteContactUsHandle()
          } }>
            Delete
          </Dropdown.Item>
          <Dropdown.Item href="#pablo" onClick={handleModalShow}>
            Send email reply
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
    <SendContactUsEmail  row={row}  show={showModal} handleClose={handleModalClose} />
    </>
   
  );
}
