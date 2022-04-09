import React, { useState } from "react";
import { Button, Form, Modal, Col, Row } from "react-bootstrap";
import IEvent, {Category, undefinedEvent} from '../IEvent';
import EventForm from '../createEventModal/EventForm'
const CreateEventModal = ({
  showModal,
  setShowModal,
  event ,
}: {
  showModal: boolean;
  setShowModal: Function;
  event:IEvent|null;
}) => {

  // TODO: edit this function to send eventData to backend
  const handleSubmit = () => {
    setShowModal(false);
  };
  const handleClose = () => {
    setShowModal(false);
  }

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
    <Modal.Title>
      {event === null ?
        "Create Event" : "Edit Event"
    }

    </Modal.Title>
  </Modal.Header>

      <Modal.Body>
        {event == null ?
           <EventForm 
           passedEvent={undefinedEvent} 
           handleButton={handleSubmit} 
           buttonText={"Submit"} 
           />
           :
           <EventForm 
           passedEvent={event} 
           handleButton={handleSubmit} 
           buttonText={"Save"} 

           />
      }
       
      </Modal.Body>
     
    </Modal>
  );
};




export default CreateEventModal;
