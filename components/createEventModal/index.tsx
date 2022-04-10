import React, { useState } from "react";

import EventForm from "../createEventModal/EventForm";

import { Modal } from "react-bootstrap";
import { supabase } from "../../utils/supabaseClient";
import IEvent, { undefinedEvent } from "../../components/IEvent";
import getEventType from "../../utils/getEventType";
import getHostId from "../../utils/getHostId";
import { definitions } from "../../types/supabase";

const CreateEventModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Function;
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: IEvent) => {
    setLoading(true);

    await createEvent(event);

    setLoading(false);
    setShowModal(false);
  };

  async function createEvent(event: IEvent) {
    try {
      // retrieve event type information based on selected category
      const et_id = await getEventType(event);

      // get user id of logged in user
      const host_id = await getHostId();

      // insert into the database
      let { data, error, status } = await supabase
        .from<definitions["EVENT"]>("EVENT")
        .insert({
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
          event_host: host_id,
        });

      if (error) throw error;

      alert("Event created successfully!");

      if (data) event.id = data[0]["event_id"];
    } catch (error: any) {
      alert(error.error_description || error.message);
    }
  }

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Create Event</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <EventForm
          loading={loading}
          passedEvent={undefinedEvent}
          handleButton={handleSubmit}
          buttonText={"Submit"}
        />
      </Modal.Body>
    </Modal>
  );
};

export default CreateEventModal;
