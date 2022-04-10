import React, { useState } from "react";

import EventForm from "../createEventModal/EventForm";

import { Button, Form, Modal, Col, Row } from "react-bootstrap";
import { definitions } from "../../types/supabase";
import { supabase } from "../../utils/supabaseClient";
import IEvent, { undefinedEvent } from "../../components/IEvent";

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
    setShowModal(false);
    console.log("Submit button clicked, please pass the data to backend");

    await createEvent(event);

    setLoading(false);
    setShowModal(false);
  };

  async function createEvent(event: IEvent) {
    try {
      // retrieve event type information based on selected category
      const et_id = await getEventType(event);

      console.log(et_id);

      // get user id of logged in user
      const host_id = await getHostId();

      console.log(host_id);

      // insert into the database
      let { data, error, status } = await supabase.from("EVENT").insert({
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
    } catch (error: any) {
      alert(error.error_description || error.message);
    }
  }

  async function getEventType(event: IEvent) {
    const { data, error } = await supabase
      .from<definitions["EVENT_TYPE"]>("EVENT_TYPE")
      .select("et_id")
      .eq("et_name", event.category);

    if (error) throw error;

    return data[0]["et_id"];
  }

  async function getHostId() {
    const { data, error } = await supabase
      .from<definitions["PARTICIPANT"]>("PARTICIPANT")
      .select("part_id")
      .eq("part_email", supabase.auth.session()?.user?.email);

    if (error) throw error;

    return data[0]["part_id"];
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
