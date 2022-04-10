import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import IEvent, { undefinedEvent } from "../IEvent";
import EventForm from "../createEventModal/EventForm";
const CreateEventModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Function;
}) => {
  // TODO: edit this function to send eventData to backend
  const handleSubmit = (e: IEvent) => {
    setShowModal(false);
  };


  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Create Event</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <EventForm
          passedEvent={undefinedEvent}
          handleButton={handleSubmit}
          buttonText={"Submit"}
        />
      </Modal.Body>
    </Modal>
  );
};

export default CreateEventModal;
