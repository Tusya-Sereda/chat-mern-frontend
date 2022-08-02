import React from "react";
import { Carousel } from "react-bootstrap";

export const CarouselComponent = () => (
  <Carousel
    styles={{ height: "100%", overflowX: "hidden", overflowY: "hidden" }}
  >
    <Carousel.Item>
      <img
        className="d-block w-100"
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          overflowX: "hidden",
          display: "inline-block",
          alignItems: "center",
          justifyContent: "center",
          objectFit: "cover",
          height: "calc(100vh - 76px)",
          padding: 0,
        }}
        src={
          "https://images.unsplash.com/photo-1607749111659-e1c8e05f5f24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnJpZW5kc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1296&q=60"
        }
        alt="Second slide"
      />

      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>

    <Carousel.Item>
      <img
        className="d-block w-100"
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          overflowX: "hidden",
          display: "inline-block",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 76px)",
          objectFit: "cover",
          padding: 0,
        }}
        src={
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=840&q=80"
        }
        alt="Second slide"
      />

      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "inline-block",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 76px)",
          objectFit: "cover",
          padding: 0,
        }}
        src={
          "https://images.unsplash.com/photo-1540331547168-8b63109225b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=838&q=80"
        }
        alt="Third slide"
      />

      <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);
