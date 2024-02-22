import UserActions from "components/UserActions/UserActions";
import React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Image,
} from "react-bootstrap";

import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { adminContactUsListService } from "services/admin.service";
import { getMediaUrl } from "config/utility";
 
import ContactusActions from "components/ContactusActions/ContactusActions";

function ContactUs() {
  const [contactusList, setcontactusList] = useState([]);
  const [contactusListMeta, setcontactusListMeta] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSearchChange = (e) => {
    setPage(1);
    setLoading(true);
    setSearchText(e.target.value);
  };
  const getUserList = async () => {
    let response = await adminContactUsListService(page, searchText);
    if (response?.data?.status === 200) {
      setLoading(false);
      setcontactusList(response.data.data.records);
      setcontactusListMeta(response.data.data.meta);
    } else {
      setLoading(false);
      alert(response?.data.error?.message);
    }
  };

  useEffect(() => {
    getUserList();
  }, [page, searchText]);

  useEffect(() => {
    console.log(contactusList);
    console.log(contactusListMeta);
  }, [contactusList, contactusListMeta]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed
    const year = date.getFullYear().toString().slice(-2); // Get last 2 digits of year

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };
  const reload = (e) =>{
    getUserList();    
  }


  const columns = [
   
    {
      name: "Subject",
      selector: (row) => row.subject || "",
      sortable: false,
    },
    {
      name: "Message",
      selector: (row) => row.message || "",
      sortable: false,
    },
    {
        name: "Sent By",
        selector: (row) => row?.contactUsUser?.name || "",
        sortable: false,
    }, 
    {
        name: "email",
        selector: (row) => row?.contactUsUser?.email || "",
        sortable: false,
    }, 
    {
        name: "Phone",
        selector: (row) => row?.contactUsUser?.phoneCountryCode+row?.contactUsUser?.phone || "",
        sortable: false,
    }, 
    {
      name: "Actions",
      cell: (row) => <ContactusActions reload={reload} row={row} />,
    },
  ];

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Col md="8">
                <Form className="mb-3">
                  <FormControl
                    type="text"
                    placeholder="Search..."
                    value={searchText}
                    onChange={handleSearchChange}
                    size="sm"
                    style={{ marginBottom: 10, marginTop: 20 }}
                  />
                </Form>
              </Col>

              <Card.Body className="table-full-width table-responsive px-0">
                {loading && (
                  <center>
                    <h5>Loading..................</h5>
                  </center>
                )}
                {!loading && (
                  <DataTable
                    columns={columns}
                    data={contactusList}
                    pagination
                    paginationServer
                    paginationTotalRows={contactusListMeta.totalRecords}
                    paginationPerPage={15}
                    paginationComponentOptions={{
                      noRowsPerPage: true,
                    }}
                    onChangePage={(page) => setPage(page)}
                  />
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ContactUs;
