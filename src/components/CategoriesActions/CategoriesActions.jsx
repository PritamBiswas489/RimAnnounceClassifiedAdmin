import React, {useState} from "react";
import { Dropdown } from "react-bootstrap";
import EditCategoryModal from "components/EditCategoryModal/EditCategoryModal";

export default function CategoriesActions({  reload, row }) {
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);
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
          <Dropdown.Item href="#pablo" onClick={handleModalShow}>
            Edit
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
    <EditCategoryModal reload={reload} row={row}  show={showModal} handleClose={handleModalClose} />
    </>
    
  );
}
