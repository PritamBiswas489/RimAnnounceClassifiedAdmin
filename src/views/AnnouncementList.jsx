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
import { adminAnnouncementListService } from "services/admin.service";
import { getMediaUrl } from "config/utility";
import AnnouncementActions from "components/AnnouncementActions/AnnouncementActions";

function AnnouncementList() {
  const [announcementList, setAnnouncementList] = useState([]);
  const [AnnouncementListMeta, setAnnouncementListMeta] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSearchChange = (e) => {
    setPage(1);
    setLoading(true);
    setSearchText(e.target.value);
  };
  const getUserList = async () => {
    let response = await adminAnnouncementListService(page, searchText);
    if (response?.data?.status === 200) {
      setLoading(false);
      setAnnouncementList(response.data.data.records);
      setAnnouncementListMeta(response.data.data.meta);
    } else {
      setLoading(false);
      alert(response?.data.error?.message);
    }
  };
  const reload = (e) =>{
    getUserList();    
  }

  useEffect(() => {
    getUserList();
  }, [page, searchText]);

  useEffect(() => {
    console.log(announcementList);
    console.log(AnnouncementListMeta);
  }, [announcementList, AnnouncementListMeta]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed
    const year = date.getFullYear().toString().slice(-2); // Get last 2 digits of year

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  const columns = [
    {
      name: "Image",
      cell: (row) =>
        row?.media ? (
          <Image
            height={50}
            width={50}
            cross-origin="*"
            src={getMediaUrl() + "/" + row.media}
            alt="Example Image"
          />
        ) : (
          ""
        ),
    },
    {
      name: "Title",
      selector: (row) => row.title || "Untitled",
      sortable: false,
    },
    {
      name: "Category",
      selector: (row) => row.category || "Untitled",
      sortable: false,
    },
    {
      name: "Location",
      cell: (row) => {
        if (row.category !== "gp_delivery") {
          return (
            (row?.announcementLocation?.name || '') +
            " " +
            (row?.announcementSubLocation?.name || '')
          );
        }

        if (row.category === "gp_delivery") {
          return row?.gpDeliveryOrigin + " ---> " + row?.gpDeliveryDestination;
        }
      },
      sortable: false,
    },
    {
      name: "Contact",
      cell: (row) => {
        return row?.phoneCountryCode + row?.contactNumber;
      },
      sortable: false,
    },
    {
      name: "Price",
      cell: (row) => {
        return row?.price;
      },
      sortable: false,
    },
    {
      name: "Created by",
      cell: (row) => {
        return row?.announcementUser?.name;
      },
      sortable: false,
    },
    {
      name: "Created Date",
      cell: (row) => {
        return formatDate(row?.createdAt);
      },
      sortable: false,
    },
    {
      name: "Actions",
      cell: (row) => <AnnouncementActions reload={reload} row={row} />,
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
                    data={announcementList}
                    pagination
                    paginationServer
                    paginationTotalRows={AnnouncementListMeta.totalRecords}
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

export default AnnouncementList;
