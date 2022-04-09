import React, { useState } from "react";
import { ListGroupItem, Card, Badge, ListGroup, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import styles from "../styles/Profile.module.css";

enum Category {
  Community = "Community",
  Meetup = "Meet up",
  Volunteering = "Volunteering",
}

interface IEvent {
  title: string;
  category: Category;
  going: number;
}

function EventItem(event: IEvent) {
  return (
    <ListGroupItem
      as="li"
      className="d-flex justify-content-between align-items-start"
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


function EventsGroup(props: { events: any[]; }) {

  if (props.events.length > 0) {
    return (
      <ListGroup className={styles.listGroup} as="ol">
        {props.events.map((item) => (
          <EventItem {...item} />
        ))}
      </ListGroup>
    );
  } else {
    return <Card.Text className={styles.noEvents}>No current events</Card.Text>;
  }
}

function Profile() {
  const currentEvents: IEvent[] = [
    {
      title: "Aged care volunteering",
      category: Category.Volunteering,
      going: 8,
    },
    {
      title: "Food distribution volunteering",
      category: Category.Volunteering,
      going: 25,
    },
    { title: "Anti-war rally", category: Category.Community, going: 652 },
  ];

  const historicalEvents: IEvent[] =  [
    {
      title: "Elderly pickup",
      category: Category.Volunteering,
      going: 10,
    },
    {
        title: "Student guide",
        category: Category.Volunteering,
        going: 7,
      },
    {
      title: "Food  volunteering",
      category: Category.Volunteering,
      going: 10,
    },
    { title: "Cycle meetup", category: Category.Meetup, going: 22 },
    { title: "Anti-Lockdown rally", category: Category.Community, going: 500 },
   
  ];
  const name = "John Smith";
  const email = "John.smith@gmail.com";

  const [historyView, setHistoryView] = useState(false);

  return (
    <Card className={styles.container}>
      <Card.Body className={styles.Body}>
        <Image
          className={styles.profileImage}
          roundedCircle
          thumbnail
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        />

        <Card.Title> {name}</Card.Title>
        <Card.Text>{email}</Card.Text>

        <Button
          variant="secondary"
          onClick={() => {
            setHistoryView(!historyView);
          }}
        >
          {historyView ? "Current" : "History"}
        </Button>

      
      </Card.Body>
      <EventsGroup events = {historyView? historicalEvents : currentEvents} />
      <Card.Body className={styles.Body}>
        <Button variant="primary">Sign Out</Button>
      </Card.Body>
    </Card>
  );
}

export default Profile;
