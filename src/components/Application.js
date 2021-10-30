import React, {useState, useEffect} from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import InterviewerList from "./InterviewerList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";


const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"

};

//next step is remove this hardcoding for interviewers
const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];


export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

const dailyAppointments = getAppointmentsForDay(state, state.day);

const setDay = day => setState(prev => ({ ...prev, day}));
useEffect(() => {
  let days = axios.get('/api/days');
  let appointments = axios.get('/api/appointments');
  let interviewers = axios.get('/api/interviewers');
  let dailyAppointments = getAppointmentsForDay(state,state.day)

Promise.all([days, appointments, interviewers]).then(results => {
  days = results[0].data;
  appointments = results[1].data;
  interviewers = results[2].data

  setState(prev => ({ ...prev, days, appointments, interviewers }));
});
}, []);


  const parsedAppointments = dailyAppointments.map(appointment => 
   <Appointment key={appointment.id} {...appointment} />);
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

  <InterviewerList interviewers={interviewers} setInterviewer={console.log} interviewer={interviewer.id}/>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
    {parsedAppointments}
   </section>
    </main>
  );
}
