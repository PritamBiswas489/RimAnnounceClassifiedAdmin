import React from "react";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import {
  deleteAnnouncement,
  announcementStatusChange,
} from "services/admin.service";
import ProductDetailsModal from "components/ProductDetailsModal/ProductDetailsModal";

export default function AnnouncementActions({ reload, row }) {
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);
  const [isUserActive, setIsUserActive] = useState(
    row.status === "ACTIVE" ? true : false
  );

  async function deleteAnnouncementPermanently() {
    const con = confirm("Are you sure?");
    if (con === true) {
      const response = await deleteAnnouncement(row.id);
      if (response?.data?.status === 200) {
        reload();
        alert("Announcement Successfully deleted");
      } else {
        alert("Process failed");
      }
    }
  }

  async function statusChange() {
    const response = await announcementStatusChange(row.id, isUserActive);
    if (response?.data?.status === 200) {
      setIsUserActive(!isUserActive);
      alert("Process success");
    } else {
      alert("Process failed");
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
            <Dropdown.Item
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                deleteAnnouncementPermanently();
              }}
            >
              Delete
            </Dropdown.Item>
            <Dropdown.Item
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                statusChange();
              }}
            >
              {isUserActive ? "Deactivate" : "Activate"}
            </Dropdown.Item>
            <Dropdown.Item
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                handleModalShow();
              }}
            >
              Details
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <ProductDetailsModal
        row={row}
        show={showModal}
        handleClose={handleModalClose}
      />
    </>
  );
}
