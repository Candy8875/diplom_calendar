import React from "react";
import dayjs from "dayjs";

const TodayDate = () => {
  return (
    <div className="today">
      <label>Сегодня</label>
      <div className="today-date">{dayjs().format("LL")}</div>
    </div>
  );
};
export default TodayDate;
