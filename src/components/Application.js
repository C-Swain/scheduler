import React, {useState, useEffect} from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import InterviewerList from "./InterviewerList";
import Appointment from "components/Appointment";


const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"

};

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
    
    appointments: {}
  });

  const dailyAppointments = [];

const setDay = day => setState(prev => ({ ...prev, day}));
const setDays = days => setState(prev => ({ ...prev, days }));

// .axios must live in a function
useEffect(() => {
  const daysURL = `/api/days`
  axios.get(daysURL).then(response => {
    console.log(response.data);
    setDays([...response.data])
  });

  //empty array means it only fills once 
}, []);
  const parsedAppointments = appointments.map((appointment) =>
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
