import React from "react";

import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {

  let isFull;
  if (props.spots === 0) {
    isFull = true;
  }

  let itemClass = classNames("day-list__item", {"day-list__item--selected" : props.selected}, {"day-list__item--full" : isFull});

  const formatSpots = () => {

    let spotsWordFormat = 'spots';
    let spotsFormat = props.spots;

    if (props.spots === 0) {
      spotsFormat = 'no';
    } else if (props.spots === 1) {
      spotsWordFormat = 'spot';
    }
    
    return [spotsFormat, spotsWordFormat];
  }

  let result = formatSpots();

  return (
    <li className={itemClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{result[0]} {result[1]} remaining</h3>
    </li>
  );
}