


export function getAppointmentsForDay(state, day) {

  
   // First check what appoinments are on day, if none return empty array
   let onDay = state.days.filter(d => d.name === day)[0];
   if(!onDay) {
    return [];
   }
 
   let result = [];
 
 //next we compare the appointment Id and push detials to the result 
   for(const id of onDay.appointments) {
     const appointmentObj = state.appointments[id];
     console.log(appointmentObj)
     result.push(appointmentObj);
   }
   return result
 
}

export function getInterview(state, interview) {
    //if no interview it returns null
    if (!interview) {

    return null;
   }
    //if there is interview there must be details
    const interviewerID = interview.interviewer;
    const interviewerObj = state.interviewers[interviewerID]
    const result = {student: interview.student, interviewer: interviewerObj}
    return result;
  }
  

 


 

 
