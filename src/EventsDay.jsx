import { useContext } from "react";
import { CalendarContext } from "./store/CalendarContextProvider";
import NextPreviousDay from "./NextPreviousDay";
import { useQuery } from "@tanstack/react-query";
import Event from "./Event";
import dayjs from "dayjs";
import { getEventsByDate } from "./api/api";

const WORKING_HOURS_START = 9 * 60; // 9:00
const WORKING_HOURS_END = 20 * 60; // 20:00
const DAY_LENGTH = WORKING_HOURS_END - WORKING_HOURS_START;

const EventsDay = () => {
  const { currentDate, selectedEvent, setSelectedEvent } =
    useContext(CalendarContext);
  const formattedDate = currentDate.format("YYYY-MM-DD");
  const { data } = useQuery({
    queryKey: ["events", formattedDate],
    queryFn: async () => await getEventsByDate(formattedDate),
    gcTime: Infinity,
  });

  const onClickEvent = (event) => {
    setSelectedEvent(event);
  };

  const containerHeight = 800;

  const calculateTop = (startDate) => {
    const startMinutes =
      dayjs(startDate).hour() * 60 + dayjs(startDate).minute();
    const minutesFromDayStart = startMinutes - WORKING_HOURS_START;
    return (minutesFromDayStart / DAY_LENGTH) * containerHeight;
  };

  const calculateHeight = (duration) => {
    return (duration / DAY_LENGTH) * containerHeight;
  };

  const hourMarkers = Array.from({ length: 12 }, (_, i) => ({
    label: `${9 + i}:00`, // 09:00-20:00
    top: (i / 11) * containerHeight,
  }));

  return (
    <div className="header-events-day">
      <div className="days-event">
        <div className="date-day-event">{currentDate.format("LL")}</div>
        <NextPreviousDay />
      </div>
      <div className="events-day" style={{ height: `${containerHeight}px` }}>
        {hourMarkers.map((marker, index) => (
          <div
            key={index}
            className="hour-marker"
            style={{ top: `${marker.top}px` }}
          >
            <span className="hour-label">{marker.label}</span>
          </div>
        ))}
        {data?.map((event) => (
          <Event
            style={{
              top: `${calculateTop(event.startDate)}px`,
              height: `${calculateHeight(
                dayjs(event.endDate).diff(dayjs(event.startDate), "minute")
              )}px`,
            }}
            isSelected={selectedEvent?.id === event?.id}
            onClickEvent={() => onClickEvent(event)}
            key={event.id}
            time={`${dayjs(event.startDate).format("HH:mm")}-${dayjs(
              event.endDate
            ).format("HH:mm")}`}
            category={event.category}
            title={event.title}
          />
        ))}
      </div>
    </div>
  );
};
export default EventsDay;
