import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
 let interviewerStyles = classNames("interveiwers__Item",
 {"interviewer__item--selected": props.selected,
"interviewers__item-image": !props.selected
})

  return (

  <li className={interviewerStyles}
  onClick={() => props.setInterviewer(props.name)}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.name}</li>

  )
}