import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {

  const parsedInterviewers = props.interviewers.map(interviewerObj => 
    
      <InterviewerListItem
        key={interviewerObj.id}
        name={interviewerObj.interviewer}
        avatar={interviewerObj.avatar}
        selected={interviewerObj.id === props.value}
        setInterviewer={() => props.onClick(interviewerObj.id)}
        {...interviewerObj}
      />);

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  );
}
