import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SideBar } from "../../components/SideBar/SideBar";
import { MessageForm } from "../../components/MessageForm/MessageForm";

export const Chat = () => (
  <Container>
    <Row>
      <Col md={4}>
        <SideBar />
      </Col>
      <Col md={8}>
        <MessageForm />
      </Col>
    </Row>
  </Container>
);
