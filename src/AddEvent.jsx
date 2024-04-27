import React from "react";
import Popup from "reactjs-popup";

export default function AddEvent() {
  return (
    <div>
      <Popup
        modal={true}
        arrow={false}
        closeOnDocumentClick
        trigger={<button className="button-event">Добавить событие</button>}
      >
        <div className="portal-window">
          <h1>Добавить событие</h1>
          <div className="window-event">
            <label>Название:</label>
            <input type="text" className="input-event" />
            <label>Начало:</label>
            <input type="datetime-local" className="input-event" />
            <label>Окончание:</label>
            <input type="datetime-local" className="input-event" />
            <label>Категория:</label>
            <select className="input-event">
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
            <input type="text" className="input-event" />
          </div>
          <button className="button-event">Добавить событие</button>
        </div>
      </Popup>
    </div>
  );
}
