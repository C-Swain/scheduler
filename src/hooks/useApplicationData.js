import axios from "axios";
import React, { useState, useEffect } from "react";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: [],
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));
  useEffect(() => {
    let days = axios.get("/api/days");
    let appointments = axios.get("/api/appointments");
    let interviewers = axios.get("/api/interviewers");

    Promise.all([days, appointments, interviewers]).then((results) => {
      days = results[0].data;
      appointments = results[1].data;
      interviewers = results[2].data;

      //needs to be an array ?
      setState((prev) => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  const updateSpots = function (state, id) {
    // find the day Object
    const currentDay = state.days.find((d) => d.appointments.includes(id));
    // get the appointment id's array
    const dayIndex = state.days.findIndex((d) => d.id === currentDay.id)
    console.log("dayIndex", dayIndex);
  
    const nullAppointments = currentDay.appointments.filter(id => !state.appointments[id].interview) 
    const spots = nullAppointments.length 

    console.log("spots", spots);
    //deep immutable update
    const newDay = { ...currentDay, spots };
    console.log("new day", newDay);
    console.log("state.day", state.day);
    const newDays = state.days.map((d) => { return d.name === state.day ? newDay : d});
    console.log("newDays", newDays);

    setState({ ...state, days: newDays });

    return newDays;
  };

  // function to book appointment
  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newState = {
      ...state,
      appointments,
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
     updateSpots(newState, id);
    
    });
  }

  // to delete an appointment
  const cancelInterview = (id ,interview) => {
    const appointment = {
      ...state.appointments[id],
      interview:  null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newState = {
      ...state,
      appointments,
    };
    
    return axios.delete(`/api/appointments/${id}`).then(() => {

   
       updateSpots(newState, id);
      
    });
  };

  //returning all for them for use in Application
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
