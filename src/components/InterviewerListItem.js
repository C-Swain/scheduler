import React from "react";

export default function InterviewerListItem(props) {
  const {...interviewer} = props;



  return (
  
  <li className="interviewers__item">
  <img
    className="interviewers__item-image"
    src={interviewer.avatar}
    alt={interviewer.name}
  />
  {interviewer.name}
</li>

  )
}