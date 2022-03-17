import React,  { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form(props){

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [errorMessage, setErrorMessage] = useState("");

  const reset = () => {
    setStudent("");
    setInterviewer(null);
    setErrorMessage("");
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  /**
   * Function sets the error message is a student/interviewer isn't selected.
   * 
   */
  function validateAppointment() {
    if (student === "" && interviewer === null) {
      setErrorMessage(
        "Please, enter your name and select an interviewer"
      );
      return;
    } else {
      if (student === "") {
        setErrorMessage("Please, enter your name");
        return;
      }
      if (interviewer === null) {
        setErrorMessage("Please, select an interviewer");
        return;
      }

    }
    setErrorMessage("");
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={student}
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <section className="appointment__validation">{errorMessage}</section>
        <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validateAppointment}>Save</Button>
        </section>
      </section>
    </main>
  );
}