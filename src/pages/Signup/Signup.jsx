import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useSignupUserMutation } from "../../services/appApi";

import womanImg from "../../assets/woman-face.jpg";
import styles from "./Signup.module.scss";

const TOAST_OPTIONS = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupUser] = useSignupUserMutation();

  // image upload states
  const [image, setImage] = useState([]);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const getImage = (e) => {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      toast.error("Max file sizw is 1mb", TOAST_OPTIONS);
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "mvpm3kqc");

    try {
      setUploadingImg(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/dmgej3a2o/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url;
    } catch (error) {
      setUploadingImg(false);
      console.log(error);
      toast.error("Something went wrong", TOAST_OPTIONS);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please upload your profile picture", TOAST_OPTIONS);
    }

    const url = await uploadImage(image);

    // signup the user
    signupUser({ name, email, password, picture: url }).then(({ data }) => {
      if (data) {
        console.log("---data", data);
        navigate("/chat");
      }
    });
  };

  return (
    <Container className={styles.container}>
      <Row className={styles.row}>
        <Col md={5} className={styles.login}></Col>
        <Col md={7} className={styles.form_login}>
          <Form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <h1 className={styles.paragraph}>Create an account</h1>
            <div className={styles.signup_profile}>
              <img
                src={imagePreview || womanImg}
                alt="profile_picture"
                className={styles.img}
              />
              <label htmlFor="image-upload" className={styles.image_label}>
                <i className="fas fa-plus-circle add-picture-icon"></i>
              </label>
              <input
                type="file"
                hidden
                id="image-upload"
                accept="image/png, image/jpeg"
                onChange={(e) => getImage(e)}
              />
            </div>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {uploadingImg ? "Signing you up..." : "Create account"}
            </Button>
            <div className={styles.info}>
              <p className={styles.text}>
                Already have an account?
                <Link to="/login" className={styles.link}>
                  Login
                </Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};
