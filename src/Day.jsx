import { useContext } from "react";
import { CalendarContext } from "./store/CalendarContextProvider";
import { getEventsByDate } from "./api/api";
import Event from "./Event";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const Day = ({ day, isCurrent }) => {
  const { setCurrentDate, currentVisibleMonth } = useContext(CalendarContext);
  const formattedDate = day.format("YYYY-MM-DD");
  const { data } = useQuery({
    queryKey: ["events", formattedDate],
    queryFn: () => getEventsByDate(formattedDate),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const isInCurrentMonth = day.isSame(currentVisibleMonth, "month");
  const topThreeEvents = data
    ?.sort((a, b) => (dayjs(a.startDate).isBefore(dayjs(b.endDate)) ? -1 : 1))
    ?.slice(0, 3);
  const moreEventsCount = data?.length - 3;

  const onClickDay = () => {
    setCurrentDate(day);
  };

  return (
    <div
      onClick={onClickDay}
      className={`day-date ${isCurrent ? "current" : ""}`}
    >
      {topThreeEvents?.map((event) => (
        <Event
          key={event.id}
          time={`${dayjs(event.startDate).format("HH:mm")}-${dayjs(
            event.endDate
          ).format("HH:mm")}`}
          category={event.category}
          title={event.title}
        />
      ))}

      <div className="day-info">
        {moreEventsCount > 0 && (
          <div className={`more-events`}>+ {moreEventsCount} more</div>
        )}
        <div className={`day-number ${!isInCurrentMonth ? "outside" : ""}`}>
          {day ? day.date() : 0}
        </div>
      </div>
    </div>
  );
};
export default Day;
