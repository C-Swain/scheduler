import React from "react";
import "components/InterviewerListItem.scss"
import classNames from "classnames";

export default function InterviewerListItem(props) {
 let interviewerStyles = classNames("interveiwers__Item",
 {"interviewers__item--selected": props.selected,

})

let imageStyle =classNames("interviewers__item-image", {
  "interviewers__item--selected-image": props.selected,

})

  return (

  <li className={interviewerStyles}
  onClick={() => props.setInterviewer(props.name)}>
  <img
    className={imageStyle}
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}</li>
  )
}