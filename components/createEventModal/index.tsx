import React, { useState } from "react";
import { Button, Form, Modal, Col, Row } from "react-bootstrap";
import { definitions } from "../../types/supabase";
import { supabase } from "../../utils/supabaseClient";

const CreateEventModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Function;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostCode] = useState("");
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);

    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    console.log("Submit button clicked, please pass the data to backend");

    await createEvent();

    setLoading(false);
    setShowModal(false);
  };

  async function createEvent() {
    try {
      // retrieve event type information based on selected category
      const et_id = await getEventType();

      console.log(et_id);

      // get user id of logged in user
      const host_id = await getHostId();

      console.log(host_id);

      // insert into the database
      let { data, error, status } = await supabase
        .from<definitions["EVENT"]>("EVENT")
        .insert({
          event_name: title,
          event_desc: description,
          event_start_datetime: new Date(date + " " + startTime).toISOString(),
          event_end_datetime: new Date(date + " " + endTime).toISOString(),
          event_address: address,
          event_postcode: postcode,
          et_id: et_id,
          event_host: host_id,
        });

      if (error) throw error;
    } catch (error: any) {
      alert(error.error_description || error.message);
    }
  }

  async function getEventType() {
    const { data, error } = await supabase
      .from<definitions["EVENT_TYPE"]>("EVENT_TYPE")
      .select("et_id")
      .eq("et_name", category);

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
    <Modal show={showModal}>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <p style={{ fontSize: "larger", fontWeight: "bolder" }}>
            Create an event
          </p>

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
                onChange={(event) => setCategory(event.target.value)}
              >
                <option>Volunteering</option>
                <option>Community Event</option>
                <option>Local Meetup</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Row>
            <Col>
              <Form.Group as={Row} className="general-form-group">
                <Form.Label column sm={4}>
                  Address
                </Form.Label>
                <Col sm={8}>
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
            </Col>
            <Col>
              <Form.Group as={Row} className="general-form-group">
                <Form.Label column sm={3}>
                  Post Code
                </Form.Label>
                <Col>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Post Code"
                    value={postcode}
                    onChange={(event) => setPostCode(event.target.value)}
                  />

                  <Form.Control.Feedback type="invalid">
                    Required
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group as={Row} className="general-form-group">
            <Form.Label column sm={2}>
              Description
            </Form.Label>
            <Col>
              <Form.Control
                required
                as="textarea"
                value={description}
                rows={4}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Col>
          </Form.Group>
          <div style={{ marginTop: "20px" }}>
            <Button id="createButton" type="submit" style={{ margin: "5px" }}>
              <span>{loading ? "Loading..." : "Create Event"}</span>
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
