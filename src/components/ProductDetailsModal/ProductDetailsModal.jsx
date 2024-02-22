import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateCategory } from "services/admin.service";
import { getAnnouncementFullDetails } from "services/admin.service";
import { getMediaUrl } from "config/utility";

const ProductDetailsModal = ({ show, handleClose, row }) => {
  const [annFullDetails, setAnnFullDetails] = useState([]);
  const [annMedias, setAnnMedias] = useState([]);
  const [loading, setLoading] = useState(true);
  const getAnnouncementFullDetailsHandle = async () => {
    const response = await getAnnouncementFullDetails(row.id);
    if (response?.data?.status === 200) {
      setLoading(false);
      setAnnFullDetails(response?.data?.data);
      setAnnMedias(response?.data?.medias);
    } else {
      setLoading(false);
      setAnnFullDetails([]);
    }
  };
  useEffect(() => {
    console.log({ annFullDetails });
    console.log({ annMedias });
  }, [annFullDetails, annMedias]);
  useEffect(() => {
    if (show === true) {
      getAnnouncementFullDetailsHandle();
    }
  }, [row.id, show]);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Announcement details <strong>"{row.title}"</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && <h2>Loading......</h2>}
        {!loading && !annFullDetails?.id && <h2>Data not found</h2>}

        {annFullDetails?.id && (
          <>
            <p><strong>Title:</strong> {annFullDetails?.title}</p>
            <p><strong>Description:</strong> {annFullDetails?.description}</p>
            <p><strong>Category:</strong> {annFullDetails?.category}</p>
            <p><strong>Price:</strong> ${annFullDetails?.price}</p>

            <p><strong>Location:</strong> {annFullDetails.category !== "gp_delivery" ? (annFullDetails?.announcementLocation?.name || '') +
            " " +
            (annFullDetails?.announcementSubLocation?.name || '') : annFullDetails?.gpDeliveryOrigin + " ---> " + annFullDetails?.gpDeliveryDestination  }</p>
            <p><strong>Contact number:</strong> {annFullDetails?.phoneCountryCode}{annFullDetails?.contactNumber}</p>
            {annFullDetails.category === "gp_delivery" && <p><strong>Delivery Date :</strong> {annFullDetails.gpDeliveryDate}</p> }
          
          </>
        )}

        <p>Images:</p>
        <div className="row">
          {annMedias.map((image, index) => (
           image.fileType === 'images' && <div key={index} className="col-md-12 mb-2">
           <img src={getMediaUrl()+'/'+image.filePath} alt={`Image ${index}`} className="img-fluid" />
         </div> )
          )}
        </div>
        <p>Videos:</p>
        <div className="row">
          {annMedias.map((image, index) => (
           image.fileType === 'videos' && <div key={index} className="col-md-12 mb-2">
           
           <video width="320" height="240" controls>
            <source src={getMediaUrl()+'/'+image.filePath} type="video/mp4"/>
            
            Your browser does not support the video tag.
            </video> 
         
         </div> )
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetailsModal;
