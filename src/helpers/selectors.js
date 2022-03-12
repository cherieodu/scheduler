export function getAppointmentsForDay(state, day) {
  if (state.days.length > 0){
    const filteredDays = state.days.filter((appointment) => appointment.name === day);
    if (filteredDays.length === 0) {
      return [];
    }
    const ids = filteredDays[0].appointments;
    const result = Object.values(state.appointments).filter((selected) => {
      for (const id of ids) {
        if (id === selected.id) {
          return selected;
        }
      }
    });
    return result;
  }
  return [];
}

export function getInterview(state, interview){
  const interviewers = state.interviewers;
  let results = {};
  
  if (!interview) {
    return null;
  }

  if (interviewers !== null) {
    for (let selected in interviewers){
      if (selected === (interview.interviewer).toString()){
        results.student = interview.student;
        results.interviewer = interviewers[selected];
      }
    } 
  }
  return results;
}

export function getInterviewersForDay(state, day) {
  let filteredInterviewers = [];
  if (state.days.length > 0){
    const filteredDays = state.days.filter((appointment) => appointment.name === day);
    if (filteredDays.length === 0) {
      return [];
    }
    
    const ids = filteredDays[0];
    ids.interviewers.forEach((interviewer) => {
      let matchedInterviewer = state.interviewers[interviewer];
      if (matchedInterviewer) {
        filteredInterviewers.push(matchedInterviewer);
      }
    });
  }

  return filteredInterviewers;
}