import React, { useState } from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  ListGroup
} from "react-bootstrap";

import styles from "../styles/Search.module.css";

function EventItem(event: any) {
  return (
    <ListGroup.Item as="li" className="d-flex align-items-start">
      <div className= {styles.eventItem}>
        <div className="fw-bold">{event.title}</div>
        {event.category}
        <div>
          {event.desc}
      </div>
      </div>
    

    </ListGroup.Item>
  );
}

export default function Search() {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    console.log(searchInput);
  };

  return (
    <Container>
      <InputGroup className="mb-3">
        <FormControl
          aria-label="search field"
          aria-describedby="search field"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={handleSearch}
        >
          Search
        </Button>
      </InputGroup>
      <ListGroup variant="flush">
          <EventItem selected category = "volunteering" title = "event 1" desc = "Workers needed! Come join us"/>
          <EventItem selected category = "volunteering" title = "event 2" desc = "big party, dont miss out"/>
      </ListGroup>
    </Container>
  );
}
