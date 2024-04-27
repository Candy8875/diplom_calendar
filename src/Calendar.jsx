import { useContext } from "react";
import { CalendarContext } from "./store/CalendarContextProvider";
import Day from "./Day";
import { splitArrayIntoChunks } from "./utils/date";

const Calendar = () => {
  const { currentDate, visibleDates } = useContext(CalendarContext);
  const datesByWeek = splitArrayIntoChunks(visibleDates, 7);

  return (
    <div className="calendar-table">
      <div className="week-days">
        <div className="week-name">Понедельник</div>
        <div className="week-name">Вторник</div>
        <div className="week-name">Среда</div>
        <div className="week-name">Четверг</div>
        <div className="week-name">Пятница</div>
        <div className="week-name">Суббота</div>
        <div className="week-name">Воскресенье</div>
      </div>
      <div className="calendar-body">
        {datesByWeek.map((week, index) => (
          <div className="week-date" key={index}>
            {week.map((day) => (
              <Day
                isCurrent={day.isSame(currentDate, "day")}
                day={day}
                key={day.date()}
              ></Day>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Calendar;
