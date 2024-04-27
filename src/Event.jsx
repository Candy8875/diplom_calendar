import React from "react";

function Event({
  title,
  time,
  category,
  onClickEvent = () => {},
  isSelected = false,
  ...otherProps
}) {
  return (
    <div
      {...otherProps}
      onClick={onClickEvent}
      className={`event ${category} ${isSelected ? "selected" : ""}`}
    >
      <div className="event-title">{title}</div>
      <div className="event-time">{time}</div>
    </div>
  );
}
export default Event;
