// Login.js
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./Login.css"; // Import your custom CSS file
import { loginService } from "../services/login.service";
import { setAuthTokens } from "../config/auth";
import { userAccountDataActions } from "store/redux/user-account-data.redux";
import { useDispatch } from "react-redux";

function Login() {
  const dispatch = useDispatch();  
  const [username, setUsername] = useState("admin@gmail.com");
  const [password, setPassword] = useState("Admin@123");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    
    e.preventDefault();
    if (username.trim() === "") {
      alert("Enter user name");
    } else if (password === "") {
      alert("Enter password");
    } else {
      setIsLoading(true);
      const response = await loginService({
        username: username,
        password: password,
      });
      if (response.data.status === 200) {
           setIsLoading(false);
           const { accessToken, refreshToken, user } = response.data.data;
           setAuthTokens(accessToken, refreshToken);
           dispatch(
            userAccountDataActions.setData({
              field: "id",
              data:  user.id,
            })
          );
          dispatch(
            userAccountDataActions.setData({
              field: "name",
              data:  user.name,
            })
          );
          dispatch(
            userAccountDataActions.setData({
               field: "email",
               data:  user.email,
            })
          );
          dispatch(
            userAccountDataActions.setData({
              field: 'phoneCountryCode',
              data: user.phoneCountryCode,
            }),
          );
          dispatch(
            userAccountDataActions.setData({
               field: "phone",
               data:  user.phone,
            })
          );
          dispatch(
            userAccountDataActions.setData({
               field: "avatar",
               data:  user.avatar,
            })
          );
          dispatch(
            userAccountDataActions.setData({
               field: "isPromoted",
               data:  user.isPromoted,
            })
          );
          dispatch(
            userAccountDataActions.setData({
               field: "isLoggedIn",
               data:  true,
            })
          );
          dispatch(
            userAccountDataActions.setData({
               field: "walletAmount",
               data:  user.walletAmount,
            })
          );
          setIsLoading(false);
          window.location.href = '/admin/dashboard';
      } else {
        setIsLoading(false);
        alert( response.data.error?.message || 'Failed to process');
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <div className="login-form">
            <h2 className="mb-4">Login</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button disabled={isLoading} variant="primary" type="submit" className="btn-block">
                 {isLoading ? 'Processing...' : 'Submit'}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
