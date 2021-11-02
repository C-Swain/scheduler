import React from "react";
import "components/Appointment/styles.scss";
import { Fragment } from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING ="DELETING"
  const EDIT = "EDITING";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE"
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
// this function saves details of a new interview 
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }

//this deletes the appointment , cancelling the interview so someone else can book the now empty space
  const deleteAppointment = () => {
    transition(DELETING, true);
    Promise.resolve(props.cancelInterview(props.id))
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          id={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          cancelInterview={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
  
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
        {mode === EDIT && (
          <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
    
        /> 
        )}
           {mode === CONFIRM && (
          <Confirm
          onCancel={back}
          onConfirm={deleteAppointment}
          message="Are you sure you would like Delete?"

        /> 
        )}
      {mode === DELETING && (
        <Status 
          message="Deleting"
        />
      )}
      {mode === SAVING && (
        <Status
        message="SAVING"
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
        message="Failed to save"
        onCancel={() => transition(SHOW)}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
        message="Could not cancel appointment"
        onCancel={() => transition(SHOW)}
        />
      )}

    </article>
  );
}
