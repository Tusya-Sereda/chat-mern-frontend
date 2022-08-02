import React, { useState, useContext } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { AppContext } from "../../context/appContext";
import { useLoginUserMutation } from "../../services/appApi";

import styles from "./Login.module.scss";

export const Login = () => {
  const navigate = useNavigate();

  const { socket } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleLogin = (e) => {
    e.preventDefault();

    //logic login
    loginUser({ email, password }).then(({ data }) => {
      if (data) {
        //socket work
        socket.emit("new-user");
        //navigate to the chat
        navigate("/chat");
      }
    });
  };

  return (
    <Container className={styles.container}>
      <Row className={styles.row}>
        <Col md={7} className={styles.form_login}>
          <Form className={styles.form} onSubmit={(e) => handleLogin(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {isLoading ? <Spinner animation="grow" /> : "Login"}
            </Button>

            <div className={styles.info}>
              <p className={styles.text}>
                Don't have an account?
                <Link to="/signup" className={styles.link}>
                  Signup
                </Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
