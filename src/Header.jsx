import NextPreviousMonth from "./NextPreviousMonth";
import TodayDate from "./TodayDate";
import CurrentMonth from "./CurrentMonth";
import AddEvent from "./AddEvent";

const Header = () => {
  return (
    <div className="header-calendar">
      <div className="months">
        <TodayDate />
        <NextPreviousMonth />
        <CurrentMonth />
      </div>
      <div className="searching-events">
        <AddEvent />
      </div>
    </div>
  );
};
export default Header;
