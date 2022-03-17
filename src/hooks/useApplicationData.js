import {useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    chosenDay: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setChosenDay = chosenDay => setState({ ...state, chosenDay });
  
  useEffect(() => {
  
    const daysURL = '/api/days';
    const appointmentsURL = '/api/appointments';
    const interviewsURL = '/api/interviewers';
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewsURL)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    }).catch((err) => {
      console.log(err);
    });
    
  }, []);
  
  /* Function adds new appointment details to the database */
  function bookInterview(id, interview) {
  
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = getDays(state.days, appointments);
  
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({...state, appointments, days});
      });
  }
  
  /* Function deletes appointments from the database */
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = getDays(state.days, appointments);
  
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days});
      });
  }

  function updateSpots(day, appointments) {
    let count = 0;
    day.appointments.forEach((id) => {
      if (appointments[id].interview === null) {
        count++;
      }
    });
    return count;
  }

  function getDays(days, appointments) {
    const daysList = days.map((day) => {
      return { ...day, spots: updateSpots(day, appointments) };
    });
    return daysList;
  }


  return { state, setState, setChosenDay, bookInterview, cancelInterview }
}