import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const CreateEventModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Function;
}) => {
  const eventTitle = "";
  const eventCategory = "";
  const eventDescription = "";
  const eventDatetime = "";
  const eventHostInfo = "";

  const [eventData, setEventData] = useState({
    eventTitle,
    eventCategory,
    eventDescription,
    eventDatetime,
    eventHostInfo,
  });

  const updateInputs = (form: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = form.target;
    setEventData({ ...eventData, [name]: value });
  };

  // TODO: edit this function to send eventData to backend
  const handleSubmit = () => {
    console.log("Submit button clicked, please pass the data to backend");
    setShowModal(false);
  };

  return (
    <Modal show={showModal}>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <p style={{ fontSize: "larger", fontWeight: "bolder" }}>
            Create an event
          </p>

          <Form.Group>
            <Form.Label>Event Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Event Title"
              name="eventTitle"
              onChange={updateInputs}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Event Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Event Category"
              onChange={updateInputs}
              required
              name="eventCategory"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Event Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Event Description"
              onChange={updateInputs}
              required
              name="eventDescription"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Event Datetime</Form.Label>
            <Form.Control
              type="text"
              placeholder="Event Datetime"
              onChange={updateInputs}
              required
              name="eventDatetime"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Event Host</Form.Label>
            <Form.Control
              type="text"
              placeholder="Event Host"
              onChange={updateInputs}
              required
              name="eventHostInfo"
            />
          </Form.Group>

          <div style={{ marginTop: "20px" }}>
            <Button id="createButton" type="submit" style={{ margin: "5px" }}>
              Create Event
            </Button>

            <Button
              type="button"
              onClick={() => setShowModal(false)}
              style={{ margin: "5px" }}
            >
              Discard
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default CreateEventModal;
