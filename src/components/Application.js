import React, {useState, useEffect} from "react";
import axios from "axios";
import { getAppointmentsForDay, getInterviewersForDay } from "helpers/selectors";
import Appointment from "./Appointment";
import "components/Application.scss";
import DayList from "./DayList";

export default function Application(props) {
  
  const [state, setState] = useState({
    chosenDay: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setChosenDay = chosenDay => setState({ ...state, chosenDay });

  let dailyAppointments = [];

  useEffect(() => {

    const daysURL = 'http://localhost:8001/api/days';
    const appointmentsURL = 'http://localhost:8001/api/appointments';
    const interviewsURL = 'http://localhost:8001/api/interviewers';
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewsURL)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
    
  }, []);

  dailyAppointments = getAppointmentsForDay(state, state.chosenDay);

  const schedule = dailyAppointments.map((appointment) => (
    <Appointment 
      key={appointment.id} 
      {...appointment} 
    />
  ));

  const interviewers = getInterviewersForDay(state, state.chosenDay);

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
        <Appointment key="last" time="5pm" interviewers={interviewers} />
      </section>
    </main>
  );
}
