import React, {useState, useEffect} from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import InterviewerList from "./InterviewerList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview ,getInterviewersForDay} from "helpers/selectors";
import useVisualMode from "hooks/useVisualMode"



export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: []
  });

const setDay = day => setState(prev => ({ ...prev, day}));
useEffect(() => {
  let days = axios.get('/api/days');
  let appointments = axios.get('/api/appointments');
  let interviewers = axios.get('/api/interviewers');
  

Promise.all([days, appointments, interviewers]).then(results => {
  days = results[0].data;
  appointments = results[1].data;
  interviewers = results[2].data;
  
  //needs to be an array ?
  setState(prev => ({ ...prev, days, appointments, interviewers }));
});
}, []);

const appointments = getAppointmentsForDay(state, state.day);
const interviewers = getInterviewersForDay(state, state.day);

const schedule = appointments.map((appointment) => {
const interview = getInterview(state, appointment.interview);

// adding function to book interview 
function bookInterview(id, interview) {
  console.log(id, interview);
}
  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={props.bookInterview}
    />
  );
});
  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
  
  <DayList days={state.days} value={state.day} onChange={setDay}/>
  </nav>

  
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
    {schedule}
    <Appointment key="last" time="5pm" />
   </section>
    </main>
  );
}
