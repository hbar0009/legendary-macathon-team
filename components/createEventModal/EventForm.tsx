import react, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import IEvent, { Category } from "../IEvent";

const EventForm = ({
  passedEvent,
  handleButton,
  buttonText,
  loading,
}: {
  passedEvent: IEvent;
  handleButton: (e: IEvent) => void;
  buttonText: string;
  loading: boolean;
}) => {
  const [title, setTitle] = useState(passedEvent.title);
  const [description, setDescription] = useState(passedEvent.description);
  const [date, setDate] = useState(passedEvent.date);
  const [category, setCategory] = useState(passedEvent.category);
  const [address, setAddress] = useState(passedEvent.address);
  const [postcode, setPostCode] = useState(passedEvent.postCode);
  const [validated, setValidated] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    setValidated(true);
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      console.log("Submit button clicked, please pass the data to backend");
      let newEvent: IEvent = {
        title: title,
        category: category,
        description: description,
        going: passedEvent.going,
        date: date,
        address: address,
        postCode: postcode,
        startTime: startTime,
        endTime: endTime,
      };
      handleButton(newEvent);
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group as={Row} className="general-form-group">
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

      <Form.Group as={Row} className="general-form-group">
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
      <Row>
        <Col>
          <Form.Group as={Row} className="general-form-group">
            <Form.Label column sm={2}>
              Start
            </Form.Label>
            <Col>
              <Form.Control
                required
                type="time"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group as={Row} className="general-form-group">
            <Form.Label column sm={2}>
              End
            </Form.Label>
            <Col>
              <Form.Control
                required
                type="time"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group as={Row} className="general-form-group">
        <Form.Label column sm={2}>
          Category
        </Form.Label>
        <Col>
          <Form.Control
            required
            as="select"
            value={category}
            onChange={(event) =>
              setCategory(Category[event.target.value as keyof typeof Category])
            }
          >
            <option>{Category.Community}</option>
            <option>{Category.Meetup}</option>
            <option>{Category.Volunteering}</option>
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="general-form-group">
        <Form.Label column sm={2}>
          Address
        </Form.Label>
        <Col>
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

      <Form.Group as={Row} className="general-form-group">
        <Form.Label column sm={2}>
          Zip
        </Form.Label>
        <Col>
          <Form.Control
            required
            type="text"
            placeholder="Post Code"
            value={postcode}
            onChange={(event) => setPostCode(event.target.value)}
          />

          <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="general-form-group">
        <Form.Label>Description</Form.Label>

        <Form.Control
          required
          as="textarea"
          value={description}
          rows={4}
          onChange={(event) => setDescription(event.target.value)}
        />
      </Form.Group>
      <div style={{ marginTop: "20px" }}>
        <Button id="createButton" type="submit" style={{ margin: "5px" }}>
          <span>{loading ? "Loading..." : buttonText}</span>
        </Button>
      </div>
    </Form>
  );
};

export default EventForm;
