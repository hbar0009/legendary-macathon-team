import React from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import styles from "../styles/CreateEventForm.module.css";

import "bootstrap/dist/css/bootstrap.min.css";

interface User {}

interface NewEvent {
  Title: string;
  Description: string;
  Host: User;
}

class CreateEventForm extends React.Component {
  state = {
    title: "",
    description: "",
    date: "",
    category: "",
  };

  setTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: e.currentTarget.value,
    });
  };

  setDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      date: e.currentTarget.value,
    });
  };

  setDescription = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      description: e.currentTarget.value,
    });
  };

  setCategory = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      category: e.currentTarget.value,
    });
  };

  handleSubmit = () => {};
  render() {
    const { title, date, category } = this.state;

    return (
      <Container className={styles.main} >
          <h1 className="mx-auto mb-4" >Create Event</h1>
        <Form onSubmit={() => this.handleSubmit} className = "d-grid gap-5">
          <Form.Group  as={Row}>
            <Form.Label column sm={2}>
              Title
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                value={title}
                onChange={(event) => this.setTitle(event as any)}
                placeholder="Event title"
              />
            </Col>
          </Form.Group>
     
          <Form.Group  as={Row}>
            <Form.Label column sm={2}>
              Date
            </Form.Label>
            <Col>
              <Form.Control type="date" value={date} onChange={this.setDate} />
            </Col>
          </Form.Group>
     
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Category
            </Form.Label>
            <Col>
              <Form.Control
                as="select"
                value={category}
                onChange={this.setCategory}
              >
                <option>Volunteering</option>
                <option>Community Event</option>
                <option>Local Meetup</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group  as={Row}>
            <Form.Label column sm={2}>
              Description
            </Form.Label>
            <Col>
              <Form.Control as="textarea" rows={4} />
            </Col>
          </Form.Group>
        </Form>
        <Button  className="mx-auto mt-4"  onClick={this.handleSubmit}>Submit</Button>
      </Container>
    );
  }
}

export default CreateEventForm;
