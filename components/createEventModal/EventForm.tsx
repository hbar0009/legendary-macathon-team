import react,{ useState }  from 'react';
import { Button, Form, Col, Row } from "react-bootstrap";
import IEvent, {Category} from '../IEvent';


const EventForm = (
    {passedEvent, 
     handleButton,
     buttonText,

    }: {passedEvent:IEvent, 
        handleButton:(e:IEvent)=>void,
        buttonText:string,  
    }

)=> {
    const [title, setTitle] = useState(passedEvent.title);
    const [description, setDescription] = useState(passedEvent.description);
    const [date, setDate] = useState(passedEvent.date);
    const [category, setCategory] = useState(passedEvent.category);
    const [address, setAddress] = useState(passedEvent.address);
    const [postcode, setPostCode] = useState(passedEvent.postCode);
    const [validated, setValidated] = useState(false);
    

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        setValidated(true);
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          
        }else{
            console.log("Submit button clicked, please pass the data to backend");
            let newEvent : IEvent = {
                title: title,
                category: category,
                description:description,
                going: passedEvent.going,
                date: date,
                address: address,
                postCode: postcode
            }
            handleButton(newEvent);
        }

      };

    return (<Form noValidate validated={validated} onSubmit={handleSubmit}>


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

        <Form.Group as={Row} className="general-form-group">
          <Form.Label column sm={2}>
            Category
          </Form.Label>
          <Col>
            <Form.Control
              required
              as="select"
              value={category}
              onChange={(event) => setCategory(Category[event.target.value as keyof typeof Category])}
            >
              <option >{Category.Community}</option>
              <option>{Category.Meetup}</option>
              <option>{Category.Volunteering}</option>
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
              <Form.Label column sm={4}>
                Post Code
              </Form.Label>
              <Col>
                <Form.Control
                  required
                  type="text"
                  placeholder="PostCode"
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
            {buttonText}
          </Button>

         
        </div>
      </Form>)
}

export default EventForm;