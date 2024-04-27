import { useContext } from "react";
import { CalendarContext } from "./store/CalendarContextProvider";

const NextPreviousDay = () => {
  const { setCurrentDate } = useContext(CalendarContext);

  const onClickNextDay = () => {
    setCurrentDate((prevDate) => prevDate.add(1, "day"));
  };

  const onClickPreviousDay = () => {
    setCurrentDate((prevDate) => prevDate.subtract(1, "day"));
  };

  return (
    <div className="buttonsNextPreviousDay">
      <button
        onClick={onClickPreviousDay}
        type="button"
        className="buttonPreviousDay"
      >
        &lt;
      </button>
      <button onClick={onClickNextDay} type="button" className="buttonNextDay">
        &gt;
      </button>
    </div>
  );
};
export default NextPreviousDay;
