import React from "react";
import { useState } from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import styles from "../styles/CreateEventForm.module.css";

import "bootstrap/dist/css/bootstrap.min.css";

interface User {}

interface IEvent {
  title: string;
  description: string;
  host: User;
  category: string;
}

function CreateEventForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostCode] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  
  return (
    <Container className={styles.main}>
      <h1 className="mx-auto mb-4">Create Event</h1>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="d-grid gap-5"
      >
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Title
          </Form.Label>
          <Col>
            <Form.Control
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Event title"
            />
            <Form.Control.Feedback type="invalid">
              Event title required
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Date
          </Form.Label>
          <Col>
            <Form.Control
            required
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Category
          </Form.Label>
          <Col>
            <Form.Control
            required
              as="select"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option>Volunteering</option>
              <option>Community Event</option>
              <option>Local Meetup</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Row>
          <Col>
            <Form.Group as={Row}>
              <Form.Label column sm={4}>
                Address
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                required
                  type="text"
                  placeholder="Address"
                  name="city"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                />

                <Form.Control.Feedback type="invalid">
                  Address required
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Post Code
              </Form.Label>
              <Col>
                <Form.Control
                required
                  type="text"
                  placeholder="PostCode"
                  value={postcode}
                  onChange={(event) => setPostCode(event.target.value)}
                />

                <Form.Control.Feedback type="invalid">
                  Required
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Description
          </Form.Label>
          <Col>
            <Form.Control
            required
              as="textarea"
              value={description}
              rows={4}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Col>
        </Form.Group>
        <Button className="mx-auto mt-4" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default CreateEventForm;
