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
  const eventCategoty = "";
  const eventDescription = "";
  const eventDatetime = "";
  const eventHostInfo = "";

  const [eventData, setEventData] = useState({
    eventTitle,
    eventCategoty,
    eventDescription,
    eventDatetime,
    eventHostInfo,
  });

  const updateInputs = (form: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = form.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Submit button clicked, please pass the data to backend");
    setShowModal(false);
  };

  return (
    <Modal show={showModal}>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <p>Create an event</p>

          <Form.Group>
            <Form.Label>Event Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Event Title"
              name="eventTitle"
              defaultValue={eventData.eventTitle}
              onChange={updateInputs}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Event Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Event Category"
              defaultValue={eventData.eventCategoty}
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
              defaultValue={eventData.eventDescription}
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
              defaultValue={eventData.eventDatetime}
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
              defaultValue={eventData.eventHostInfo}
              onChange={updateInputs}
              required
              name="eventHostInfo"
            />
          </Form.Group>

          <div>
            <Button id="createButton" type="submit">
              Create Event
            </Button>

            <Button type="button" onClick={() => setShowModal(false)}>
              Discard
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default CreateEventModal;
