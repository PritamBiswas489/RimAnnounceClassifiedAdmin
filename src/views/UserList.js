import UserActions from "components/UserActions/UserActions";
import React from "react";
import { useState, useEffect } from "react";
import { Card, Container, Row, Col, Form, FormControl } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { adminUserListService } from "services/admin.service";

function UserList() {
  const [userList, setUserList] = useState([]);
  const [userListMeta, setUserListMeta] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [queryParams, setQueryParams] = useState({});

 

  const handleSearchChange = (e) => {
    setPage(1)
    setLoading(true)
    setSearchText(e.target.value);
  };

  const reload = (e) =>{
    getUserList();    
  }
  const getUserList = async () => {
    let response = await adminUserListService(page,searchText);
    if (response?.data?.status === 200) {
      setLoading(false);
      setUserList(response.data.data.records);
      setUserListMeta(response.data.data.meta);
    } else {
      setLoading(false);
      alert(response?.data.error?.message);
    }
  };

  useEffect(() => {
    getUserList();    
  }, [page,searchText]);

  useEffect(() => {
    console.log(userList);
    console.log(userListMeta);
  }, [userList, userListMeta]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name || "Untitled",
      sortable: false,
    },
    {
      name: "Email",
      selector: (row) => row.email || "",
      sortable: false,
    },
    {
      name: "Phone",
      selector: (row) => row?.phoneCountryCode + row.phone || "",
      sortable: false,
    },
    {
      name: "Wallet Amt.",
      selector: (row) => row.walletAmount || "",
      sortable: false,
    },
    {
      name: "Actions",
      cell: (row) => <UserActions reload={reload} row={row} />,
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
                {loading && <center><h5>Loading..................</h5></center>}
                {!loading && (
                  <DataTable
                    columns={columns}
                    data={userList}
                    pagination
                    paginationServer
                    paginationTotalRows={userListMeta.totalRecords}
                    paginationPerPage={100}
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

export default UserList;
