import { React, createContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import { getDatesOfMonthWithOutsideDays } from "../utils/date";

export const CalendarContext = createContext({});

export const CalendarContextProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [currentVisibleMonth, setCurrentVisibleMonth] = useState(
    dayjs().date(1)
  );
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    if (currentDate) {
      const isNewDateVisible = visibleDates.some(
        (date) => date.format("YYYY-MM-DD") === currentDate.format("YYYY-MM-DD")
      );
      if (!isNewDateVisible) {
        setCurrentVisibleMonth(currentDate.clone().startOf("month"));
      }
    }
  }, [currentDate]);

  const visibleDates = getDatesOfMonthWithOutsideDays(
    currentVisibleMonth.year(),
    currentVisibleMonth.month()
  );

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        currentVisibleMonth,
        setCurrentVisibleMonth,
        selectedEvent,
        setSelectedEvent,
        visibleDates,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
