import React from 'react'
import Data from "../../pages/api/cities.json";
import {
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import styles from "../../styles/EventList.module.css";

interface IData {
  title: string;
  date: string;
  category: string;
  address: string;
  postcode: string;
  description: string;
  latitude: number;
  longitude: number;
  host: {
    name: string;
    address: string;
    phone: string;
    website: string;
    description: string;
  };
}


const buildLocationList = (data:IData[], ref:any) => {
  return data.map((d:{
    title:string,
    date:string,
    address:string,
    description:string,
    host:{name:string, website:string},
      }) => {
    return (
      <ListGroupItem 
        className={styles.listItem}

        onClick={() => console.log(ref)}
        
        key={data.indexOf(d)}>
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <div style={{fontWeight:"bold"}}>{d.title}</div>
          <div className={styles.date}>{d.date}</div>
        </div>
       
        <div className={styles.address}>{d.address}</div>
        <div className={styles.description}>{d.description}</div>
        <a href={d.host.website} className={styles.host}>{d.host.name}</a>
      </ListGroupItem>
    )
  })
}


const eventList = ({ref}:{ref:any | null}) => {

  
  return (
    <div style={{
      display:"flex",
      flexDirection:"column",
      position:"fixed",
      zIndex:2,
      maxWidth:"35%",
      maxHeight:"400px",
      top:"100px",
      left:"30px",
      backgroundColor:"white",
      boxShadow:"0px 4px 10px 0px rgba(0,0,0,0.25)",
      borderRadius:"4px"
      }}>
      <h3 className={styles.title}>Event List</h3>
      <ListGroup style={{overflowY:"scroll"}}>
        {buildLocationList(Data, ref)}
      </ListGroup>
     
      
    </div>
  )
}

export default eventList