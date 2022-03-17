import { useState } from "react";

export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false){
    
    if (replace){
      let historyCopy = history;
      historyCopy.splice(historyCopy.length - 1, 1);
      historyCopy.push(newMode);
      setHistory(historyCopy);
      setMode(history[history.length - 1]);
    } else {
      let historyCopy = history;
      if (history[history.length - 1] !== newMode){
        historyCopy.push(newMode);
      }
      setHistory(historyCopy);
      setMode(newMode);
    }
    
    
  }

  function back(){
    if (history.length > 2){
      setMode(history[history.length - 2]);
    } else {
      setMode(history[0]);
    }
    if (history[history.length - 1] === 'ERROR_SAVE' || 'ERROR_DELETE') {
      let historyCopy = history;
      historyCopy.splice(historyCopy.length - 1, 1);
      setHistory(historyCopy);
    }
  }
  return {mode, transition, back};
}
