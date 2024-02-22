import React from "react";
import { useState, useEffect } from "react";
import { getSiteSettings, saveSiteSettings } from "services/admin.service";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Settings() {
  
  const [admin_call_number,set_admin_call_number] = useState('');
  const [admin_whatsapp_number,set_admin_whatsapp_number] = useState('');
  const [terms_conditions,set_terms_conditions] = useState('');
  const [terms_conditions_fr,set_terms_conditions_fr] = useState('');
  const [terms_conditions_ar,set_terms_conditions_ar] = useState('');

  async function getSettings(){
    const response = await getSiteSettings()
    if (response?.data?.status === 200) {
    
      set_admin_call_number(response?.data?.data?.admin_call_number)
      set_admin_whatsapp_number(response?.data?.data?.admin_whatsapp_number)
      set_terms_conditions(response?.data?.data?.terms_conditions)
      set_terms_conditions_fr(response?.data?.data?.terms_conditions_fr)
      set_terms_conditions_ar(response?.data?.data?.terms_conditions_ar)
    }
  }

  async function handleSaveSettings(){
    const data = {admin_call_number,admin_whatsapp_number,terms_conditions,terms_conditions_fr,terms_conditions_ar};
    const response = await saveSiteSettings(data)
    if (response?.data?.status === 200) {
           alert('Settings successfully updated')
    }else{
      alert('Settings failed to updated')
    }

  }

  useEffect(()=>{
    getSettings()
  },[])

  

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Admin call number</label>
                        <Form.Control
                          defaultValue={admin_call_number}
                          type="text"
                          onInput={(e)=>set_admin_call_number(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Admin whatsapp number</label>
                        <Form.Control
                          defaultValue={admin_whatsapp_number}
                          type="text"
                          onInput={(e)=>set_admin_whatsapp_number(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Terms conditions english</label>
                        <Form.Control
                          cols="80"
                          defaultValue={terms_conditions}
                          onInput={(e)=>set_terms_conditions(e.target.value)}
                          rows="4"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Terms conditions french</label>
                        <Form.Control
                          cols="80"
                          defaultValue={terms_conditions_fr}
                          onInput={(e)=>set_terms_conditions_fr(e.target.value)}
                          rows="4"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Terms conditions arabic</label>
                        <Form.Control
                          cols="80"
                          defaultValue={terms_conditions_ar}
                          onInput={(e)=>set_terms_conditions_ar(e.target.value)}
                          rows="4"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="button"
                    variant="info"
                    onClick={handleSaveSettings}
                  >
                    Update Settings
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Settings;
