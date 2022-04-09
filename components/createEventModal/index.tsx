import React, { useState } from "react";
import { Modal} from "react-bootstrap";
import IEvent, {undefinedEvent} from '../IEvent';
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
  const handleSubmit = (e:IEvent) => {
    setShowModal(false);
  };

  const handleSave = (e:IEvent) => {
    setShowModal(false);

  }

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
           handleButton={handleSave} 
           buttonText={"Save"} 

           />
      }
       
      </Modal.Body>
     
    </Modal>
  );
};




export default CreateEventModal;
