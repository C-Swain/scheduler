import React from "react";
import "components/Appointment/styles.scss"
import { Fragment } from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";



export default function Appointment(props) {

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview
      ?<Show
    student={props.interview.student}
    //this is really long i need to shorten it
    interviewer={props.interview.interviewer.name}
    />
    //is this the right way to put empty?
    :<Empty/>}
  </article>
   );
  
}