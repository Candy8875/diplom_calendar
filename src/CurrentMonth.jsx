import { useContext } from "react";
import { CalendarContext } from "./store/CalendarContextProvider";

const CurrentMonth = () => {
  const { currentVisibleMonth } = useContext(CalendarContext);
  return (
    <div className="current-month">
      {currentVisibleMonth.format("MMMM YYYY")}
    </div>
  );
};
export default CurrentMonth;
