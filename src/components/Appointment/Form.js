import InterviewerList from "components/InterviewerList";
import React, { useState } from "react";
import Button from "components/Button";

export default function Form(props) {

  const [currentName, setName] = useState(props.student || "");
  //figured out that i need the id for the interviewer to come preselected
  const [currentInterviewer, setInterviewer] = useState(props.interviewer || null);

  //we need a function to clear all the fields
  const reset = () => {
    setName("");
    setInterviewer("null");
  };
  function cancel() {
    reset();
    props.onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input 
            className="appointment__create-input text--semi-bold"
            name="Name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setName(event.target.value)}
            value={currentName}
            placeholder={currentName ? currentName : "Please enter your name"}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={currentInterviewer}
          onChange={(event) => setInterviewer(event)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button
            confirm
            onClick={() => props.onSave(currentName, currentInterviewer)}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
