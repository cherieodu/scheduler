import { useState } from "react";

export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const [position, setPosition] = useState(history.length - 1);

  function transition(newMode, replace = false){
    if (replace){
      let historyCopy = history;
      historyCopy.splice(historyCopy.length - 1, 1);
      historyCopy.push(newMode);
      setHistory(historyCopy);
      setMode(history[history.length - 1]);
    } else {
      setHistory(prev => ([...prev, newMode]));
      setMode(newMode);
    } setPosition(history.length - 1); 
  }

  function back(){
    if (history.length > 2){
      setPosition(position - 1);
      if (position <= 0) {
        setMode(history[0]);
      } else {
        setMode(history[position]);
      }
    } else {
      setMode(history[0]);
    }
  }
  return {mode, transition, back};
}
