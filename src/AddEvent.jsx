import React from "react";
import Popup from "reactjs-popup";
import { addEvent } from "./api/api";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { useQueryClient } from "@tanstack/react-query";

export default function AddEvent() {
  const queryClient = useQueryClient();
  const titleRef = React.useRef(null);
  const startDateRef = React.useRef(null);
  const endDateRef = React.useRef(null);
  const categoryRef = React.useRef(null);
  const descriptionRef = React.useRef(null);

  async function onClickAddEvent(close) {
    const event = {
      id: uuidv4(),
      title: titleRef.current.value,
      startDate: startDateRef.current.value,
      endDate: endDateRef.current.value,
      category: categoryRef.current.value,
      description: descriptionRef.current.value,
    };
    await addEvent(event);

    const formattedDate = dayjs(event.startDate).format("YYYY-MM-DD");
    await queryClient.invalidateQueries({
      queryKey: ["events", formattedDate],
    });

    close();
  }
  return (
    <div>
      <Popup
        modal={true}
        arrow={false}
        closeOnDocumentClick
        trigger={<button className="button-event">Добавить событие</button>}
      >
        {(close) => (
          <div className="portal-window">
            <h1>Добавить событие</h1>
            <div className="window-event">
              <label>Название:</label>
              <input
                id="title"
                ref={titleRef}
                type="text"
                className="input-event"
              />
              <label>Начало:</label>
              <input
                id="startDate"
                ref={startDateRef}
                type="datetime-local"
                className="input-event"
              />
              <label>Окончание:</label>
              <input
                id="endDate"
                ref={endDateRef}
                type="datetime-local"
                className="input-event"
              />
              <label>Категория:</label>
              <select id="category" ref={categoryRef} className="input-event">
                <option value="important" id="eventImportant">
                  Важное событие
                </option>
                <option value="meeting" id="eventMeeting">
                  Встреча с руководителем
                </option>
                <option value="team-meeting" id="eventTeamMeeting">
                  Командное собрание
                </option>
                <option value="conference" id="eventConference">
                  Конференция
                </option>
              </select>
              <label>Описание:</label>
              <input
                id="description"
                ref={descriptionRef}
                type="text"
                className="input-event"
              />
            </div>
            <button
              onClick={() => onClickAddEvent(close)}
              className="button-event"
            >
              Добавить событие
            </button>
          </div>
        )}
      </Popup>
    </div>
  );
}
