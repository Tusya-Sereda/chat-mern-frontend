import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { CarouselComponent } from "../../components/Carousel/Carousel";
import styles from "./Home.module.scss";

export const Home = () => (
  <Row className={styles.main_content}>
    <Col md={6} className={styles.main_info}>
      <h1> Share the world with your friends? </h1>
      <p> ChatApp lets you connect with the world</p>
      <LinkContainer to="/chat">
        <Button variant="success" className={styles.button}>
          Get Started
          <i className="fas fa-comments home-message-icon"></i>
        </Button>
      </LinkContainer>
    </Col>
    <Col md={6} className={styles.home_img}>
      <CarouselComponent />
    </Col>
  </Row>
);
