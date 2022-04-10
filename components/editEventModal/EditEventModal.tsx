import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import IEvent from "../IEvent";
import EventForm from "../createEventModal/EventForm";
import getEventType from "../../utils/getEventType";
import getHostId from "../../utils/getHostId";
import { supabase } from "../../utils/supabaseClient";
import { definitions } from "../../types/supabase";

const EditEventModal = ({
  showModal,
  setShowModal,
  event,
}: {
  showModal: boolean;
  setShowModal: Function;
  event: IEvent;
}) => {
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: IEvent) => {
    setLoading(true);

    await updateEvent(event);

    setLoading(false);
    setShowModal(false);
  };

  async function updateEvent(event: IEvent) {
    try {
      // retrieve event type information based on selected category
      const et_id = await getEventType(event);

      // update the database
      let { data, error, status } = await supabase
        .from<definitions["EVENT"]>("EVENT")
        .update({
          event_name: event.title,
          event_desc: event.description,
          event_start_datetime: new Date(
            event.date + " " + event.startTime
          ).toISOString(),
          event_end_datetime: new Date(
            event.date + " " + event.endTime
          ).toISOString(),
          event_address: event.address,
          event_postcode: event.postCode,
          et_id: et_id,
        })
        .match({ event_id: event.id });

      if (error) throw error;

      alert("Event updated successfully!");
    } catch (error: any) {
      alert(error.error_description || error.message);
    }
  }

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Event</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <EventForm
          loading={loading}
          passedEvent={event}
          handleButton={handleSave}
          buttonText={"Save"}
        />
      </Modal.Body>
    </Modal>
  );
};

export default EditEventModal;
