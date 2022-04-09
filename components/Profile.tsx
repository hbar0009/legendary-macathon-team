import React, { useState } from "react";
import {
  ListGroupItem,
  Card,
  Badge,
  ListGroup,
  Button,
  Tabs,
  Tab,
  Container
} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import styles from "../styles/Profile.module.css";

import IEvent, {Category, undefinedEvent} from '../components/IEvent'
import CreateEventModal from '../components/createEventModal/index'


function EventItem(event: IEvent) {
  return (
    <ListGroupItem
      as="li"
      className="d-flex align-items-start"
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

function ActionEventItem({event, action}: {event:IEvent, action: (e:IEvent)=> void}){
  return (
    <ListGroupItem
      as="li"
      className="d-flex align-items-start"
      action onClick={() => action(event)}
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
const NoEvent = () =>{
  return <Card.Text className={styles.noEvents}>No events</Card.Text>;
}


const MyEventsGroup = ({events, action}: {events:IEvent[], action: (e:IEvent)=> void}) => {
  if (events.length > 0) {
    return (
      <ListGroup className={styles.listGroup} as="ol">
        {events.map((item, index) => {
          return <ActionEventItem key={index} event = {item} action={action} />;
        })}
        
      </ListGroup>
    );
  } else {
    return <NoEvent/>
  }

}


function EventsGroup(props: { events: any[] }) {
  if (props.events.length > 0) {
    return (
      <ListGroup className={styles.listGroup} as="ol">
        {props.events.map((item, index) => {
          return <EventItem key={index} {...item} />;
        })}
        
      </ListGroup>
    );
  } else {
    return <NoEvent/>
  }
}

function Profile({action}: {action:(e: IEvent)=> void}) {

  const currentEvents: IEvent[] = [
    {...undefinedEvent,
      title: "Aged care volunteering",
      category: Category.Volunteering,
      going: 8,
    },
    {...undefinedEvent,
      title: "Food distribution volunteering",
      category: Category.Volunteering,
      going: 25,
    },
    { ...undefinedEvent,
      title: "Anti-war rally", category: Category.Community, going: 652 },
  ];

  const ownEvents :IEvent[] =[
    {...undefinedEvent,
      title: "Gamers meetup",
      category: Category.Meetup,
      description:"",
      going: 17,

    }
  ]


  const historicalEvents: IEvent[] = [
    {...undefinedEvent,
      title: "Elderly pickup",
      category: Category.Volunteering,
      description:"",
      going: 10,
    },
    {...undefinedEvent,
      title: "Student guide",
      category: Category.Volunteering,
      description:"",
      going: 7,
    },
    {...undefinedEvent,
      title: "Food  volunteering",
      category: Category.Volunteering,
      description:"",
      going: 10,
    },
    { ...undefinedEvent, title: "Cycle meetup", category: Category.Meetup,  description:"", going: 22 },
    {...undefinedEvent, title: "Anti-Lockdown rally", category: Category.Community,  description:"", going: 500 },
  ];
  const name = "John Smith";
  const email = "John.smith@gmail.com";

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
        <Tabs className = {styles.tabs}
          defaultActiveKey="current"
        
        >
          <Tab eventKey="current" title="Current" className={styles.tab}>
          <EventsGroup events={currentEvents} /> 
          </Tab>
          <Tab eventKey="history" title="History" className={styles.tab}>
          <EventsGroup events={historicalEvents}  /> 
          </Tab>
          <Tab  eventKey="owned" title="Hosting" className={styles.tab}>
          <MyEventsGroup events={ownEvents} action = {action} /> 
          </Tab>
        </Tabs>
   
      <Card.Body className={styles.body}>
      
      </Card.Body>
   
    <Button className={styles.button} variant="primary">Sign Out</Button>
    </Container>
  );
}

export default Profile;
