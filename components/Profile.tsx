import React, { useState, useEffect } from "react";
import {
  ListGroupItem,
  Card,
  Badge,
  ListGroup,
  Button,
  Tabs,
  Tab,
  Container,
} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import styles from "../styles/Profile.module.css";

import IEvent, { Category, undefinedEvent } from "./IEvent";
import CreateEventModal from "../components/createEventModal/index";
import { GetEvents, GetEventByID , GetUserDetails, GetHostedEvents,ConvertToEvent} from "../Functions/SupabaseFunctions";
import { definitions } from "../types/supabase";



function EventItem(event: IEvent) {
  return (
    <ListGroupItem as="li" className="d-flex align-items-start">
      <div className="ms-2 me-auto">
        <div className="fw-bold">{event.title}</div>
        {event.category}
      </div>
      <Badge bg="primary" pill>
        {event.going}
      </Badge>
    </ListGroupItem>
  );
}

function ActionEventItem({
  event,
  action,
}: {
  event: IEvent;
  action: (e: IEvent) => void;
}) {
  return (
    <ListGroupItem
      as="li"
      className="d-flex align-items-start"
      action
      onClick={() => action(event)}
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{event.title}</div>
        {event.category}
      </div>
      <Badge bg="primary" pill>
        {event.going}
      </Badge>
    </ListGroupItem>
  );
}
const NoEvent = () => {
  return <Card.Text className={styles.noEvents}>No events</Card.Text>;
};

const MyEventsGroup = ({
  events,
  action,
}: {
  events: IEvent[] | undefined;
  action: (e: IEvent) => void;
}) => {
  if (events) {
    return (
      <ListGroup className={styles.listGroup} as="ol">
        {events.map((item, index) => {
          return <ActionEventItem key={index} event={item} action={action} />;
        })}
      </ListGroup>
    );
  } else {
    return <NoEvent />;
  }
};

function EventsGroup({ events }: { events: IEvent[] | undefined }) {
  if (events) {
    return (
      <ListGroup className={styles.listGroup} as="ol">
        {events.map((item, index) => {
          return <EventItem key={index} {...item} />;
        })}
      </ListGroup>
    );
  } else {
    return <NoEvent />;
  }
}

async function SetUserDetails(setName:Function, setEmail:Function){
  const userData = await GetUserDetails();
  if(userData){
    setName(userData[0]["part_fname"]);
    setEmail(userData[0]["part_email"]);

  }
}

async function GetCurrentEvents(setCurrentEvents: Function, setPastEvents:Function) {
  const data = await GetEvents();

  if (data) {
    const eventsArray = await Promise.all(
      data.map((item) => GetEventByID(item.event_id))
    );
    if(eventsArray){
      const pastEvents = eventsArray.filter((event) => {
        var currentDate = new Date();
        if(event){
          var endDate = new Date(event.endTime);
          return (currentDate.getTime() > endDate.getTime())
        }
        return false;
      } );
      setPastEvents(pastEvents);
    }
   
    if (eventsArray) {
      setCurrentEvents(eventsArray);
    }
  }
}

async function GetMyEvents(setHostedEvents: Function) {
  const eventsArray = await GetHostedEvents();
  setHostedEvents(eventsArray);
}


function Profile({ action }: { action: (e: IEvent) => void }) {
  const [currentEvents, setCurrentEvents] = useState<IEvent[]>();
  const [hostedEvents, setHostedEvents] = useState<IEvent[]>();
  const [pastEvents, setPastEvents] = useState<IEvent[]>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  useEffect(() => {
    GetCurrentEvents(setCurrentEvents,setPastEvents);
    SetUserDetails(setName,setEmail );
    GetMyEvents(setHostedEvents);
  }, []);
  

  return (
    <Container className={styles.container}>
      <Image
        className={styles.profileImage}
        roundedCircle
        thumbnail
        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      />

      <Card.Title className={styles.profileName}> {name}</Card.Title>
      <Card.Text>{email}</Card.Text>
      <Tabs className={styles.tabs} defaultActiveKey="current">
        <Tab eventKey="current" title="Current" className={styles.tab}>
          <EventsGroup events={currentEvents} />
        </Tab>
        <Tab eventKey="history" title="History" className={styles.tab}>
          <EventsGroup events={pastEvents} />
        </Tab>
        <Tab eventKey="owned" title="Hosting" className={styles.tab}>
          <MyEventsGroup events={hostedEvents} action={action} />
        </Tab>
      </Tabs>

      <Card.Body className={styles.body}></Card.Body>

      <Button className={styles.button} variant="primary">
        Sign Out
      </Button>
    </Container>
  );
}

export default Profile;
