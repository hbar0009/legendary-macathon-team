import React from "react";
import { Modal } from "react-bootstrap";
import IEvent from "../IEvent";
import EventForm from "../createEventModal/EventForm";
const EditEventModal = ({
  showModal,
  setShowModal,
  event,
}: {
  showModal: boolean;
  setShowModal: Function;
  event: IEvent ;
}) => {

  const handleSave = (e: IEvent) => {
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>"Edit Event"</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <EventForm
          passedEvent={event}
          handleButton={handleSave}
          buttonText={"Save"}
        />
      </Modal.Body>
    </Modal>
  );
};

export default EditEventModal;
