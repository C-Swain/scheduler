import React from "react";
import "components/Appointment/styles.scss"

export default function Appointment(props) {
const time = props.time;
  return ( 

  <article className="appointment">Appointment at {time}</article>
  )
}