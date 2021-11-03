import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {

  const parsedInterviewers = props.interviewers.map(interviewerObj => 
    
    
      <InterviewerListItem
        key={interviewerObj.id}
        name={interviewerObj.interviewer}
        avatar={interviewerObj.avatar}
        selected={interviewerObj.id === props.value}
      
        setInterviewer={() => props.onChange(interviewerObj.id)}
        {...interviewerObj}
      />);

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
    
  );

}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};