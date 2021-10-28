import React from "react";
import "components/Appointment/styles.scss"

export default function Appointment(props) {
  const showText = () => {
    if (props.time) {
      return `Appointment is at ${props.time}`
    } else {
      return "No Appointments"
    }
  }

  return  <article className="appointment"> {showText()}</article>
  
}