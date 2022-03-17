import React from "react";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import Appointment from "./Appointment";
import "components/Application.scss";
import DayList from "./DayList";
import useApplicationData from "hooks/useApplicationData";

export default function Application() {
  
  const { state, setChosenDay, bookInterview, cancelInterview } = useApplicationData();
  const interviewers = getInterviewersForDay(state, state.chosenDay);
  const dailyAppointments = getAppointmentsForDay(state, state.chosenDay);

  
  /**
   * @returns appointment details
   */
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment 
        key={appointment.id} 
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.chosenDay}
          onChange={setChosenDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
