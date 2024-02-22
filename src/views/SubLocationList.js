import SubLocationsActions from "components/SubLocationsActions/SubLocationsActions";
import React from "react";
import { useState, useEffect } from "react";
import { Card, Container, Row, Col, Form, FormControl } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { adminSubLocationsListService } from "services/admin.service";

function SubLocationList() {
  const [userList, setUserList] = useState([]);
  const [userListMeta, setUserListMeta] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSearchChange = (e) => {
    setPage(1)
    setLoading(true)
    setSearchText(e.target.value);
  };
  const getUserList = async () => {
    let response = await adminSubLocationsListService(page,searchText);
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

  const reload = (e) =>{
    getUserList();    
  }

  const columns = [
    {
        name: "Name",
        selector: (row) => row.name || "Untitled",
        sortable: false,
      },
      {
        name: "Location",
        selector: (row) => row?.locationSublocation?.name || "Untitled",
        sortable: false,
      },
      {
          name: "Fr Name",
          selector: (row) => row.frName || "Untitled",
          sortable: false,
        },
        {
          name: "Ar Name",
          selector: (row) => row.arName || "Untitled",
          sortable: false,
        },
      
      {
        name: "Actions",
        cell: (row) => <SubLocationsActions reload={reload} row={row} />,
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

export default SubLocationList;
