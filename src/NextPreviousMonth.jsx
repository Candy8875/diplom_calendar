import { useContext } from "react";
import { CalendarContext } from "./store/CalendarContextProvider";

const NextPreviousMonth = () => {
  const { setCurrentVisibleMonth } = useContext(CalendarContext);

  const onClickNextMonth = () => {
    setCurrentVisibleMonth((prevDate) => prevDate.add(1, "month"));
  };
  const onClickPreviousMonth = () => {
    setCurrentVisibleMonth((prevDate) => prevDate.subtract(1, "month"));
  };

  return (
    <div className="buttonsNextPrevious">
      <button
        type="button"
        className="buttonPrevious"
        onClick={onClickPreviousMonth}
      >
        &lt;
      </button>
      <button type="button" className="buttonNext" onClick={onClickNextMonth}>
        &gt;
      </button>
    </div>
  );
};
export default NextPreviousMonth;
