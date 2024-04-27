import { useContext } from "react";
import { CalendarContext } from "./store/CalendarContextProvider";
import dayjs from "dayjs";

const MoreInfoEvents = () => {
  const { selectedEvent } = useContext(CalendarContext);

  if (!selectedEvent) {
    return <></>;
  }

  return (
    <div className="more-info-events">
      <div className="title-event">{selectedEvent.title}</div>
      <div className="day-time-event">
        <div className="dayy-event">
          {dayjs(selectedEvent.startDate).format("LL")}
        </div>
        <div className="time-event">
          {dayjs(selectedEvent.startDate).format("HH:mm")}-
          {dayjs(selectedEvent.endDate).format("HH:mm")}
        </div>
      </div>
      <div className="description-event">{selectedEvent.description}</div>
    </div>
  );
};
export default MoreInfoEvents;
