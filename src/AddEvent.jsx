import React from "react";
import Popup from "reactjs-popup";
import { addEvent } from "./api/api";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export default function AddEvent() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();
  async function onClickAddEvent(close, event) {
    event.id = uuidv4();
    await addEvent(event);

    const formattedDate = dayjs(event.startDate).format("YYYY-MM-DD");
    await queryClient.invalidateQueries({
      queryKey: ["events", formattedDate],
    });

    reset();
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
            <form
              onSubmit={handleSubmit((data) => {
                console.log(errors);
                onClickAddEvent(close, data);
              })}
            >
              <div className="window-event">
                <label>Название:</label>
                <input
                  {...register("title", { required: true })}
                  id="title"
                  type="text"
                  className={`input-event ${
                    errors.startDate ? "input-failed" : ""
                  }`}
                />
                {errors.title && (
                  <p className="font-failed">Пожалуйста, введите название</p>
                )}
                <label>Начало:</label>
                <input
                  id="startDate"
                  {...register("startDate", {
                    required: true,
                    validate: {
                      isInWorkingHours: (startDate) => {
                        const startTime = dayjs(startDate, "HH:mm").hour(9);
                        const endTime = dayjs(startDate, "HH:mm").hour(20);

                        return (
                          dayjs(startDate, "HH:mm").isBetween(
                            startTime,
                            endTime,
                            "hour",
                            "[)"
                          ) ||
                          "Время начала события должно быть в диапазоне [09:00-20:00)"
                        );
                      },
                      isSameDay: (startDate, formValues) => {
                        if (!formValues.endDate) {
                          return true;
                        }

                        return (
                          dayjs(startDate).isSame(
                            dayjs(formValues.endDate),
                            "day"
                          ) || "Начало и конец события должны быть в один день"
                        );
                      },
                      isLessThanEndDate: (startDate, formValues) => {
                        if (!formValues.endDate) {
                          return true;
                        }

                        return (
                          dayjs(startDate) < dayjs(formValues.endDate) ||
                          "Время начала события не может быть позже окончания"
                        );
                      },
                    },
                  })}
                  type="datetime-local"
                  className={`input-event ${
                    errors.startDate ? "input-failed" : ""
                  }`}
                />
                {errors.startDate?.type === "required" && (
                  <p className="font-failed">Пожалуйста, введите начало</p>
                )}
                {(errors.startDate?.type === "isInWorkingHours" ||
                  errors.startDate?.type === "isSameDay" ||
                  errors.startDate?.type === "isLessThanEndDate") && (
                  <p className="font-failed">{errors.startDate.message}</p>
                )}
                <label>Окончание:</label>
                <input
                  id="endDate"
                  {...register("endDate", {
                    required: true,
                    validate: {
                      isInWorkingHours: (value) => {
                        const startTime = dayjs(value, "HH:mm")
                          .hour(9)
                          .minute(15);
                        const endTime = dayjs(value, "HH:mm")
                          .hour(20)
                          .minute(0);

                        return (
                          dayjs(value, "HH:mm").isBetween(
                            startTime,
                            endTime,
                            null,
                            "[]"
                          ) ||
                          "Время начала события должно быть в диапазоне [09:15-20:00]"
                        );
                      },
                      isSameDay: (endDate, formValues) => {
                        if (!formValues.startDate) {
                          return true;
                        }

                        return (
                          dayjs(endDate).isSame(
                            dayjs(formValues.startDate),
                            "day"
                          ) || "Начало и конец события должны быть в один день"
                        );
                      },
                      isGreaterThanStartDate: (endDate, formValues) => {
                        if (!formValues.startDate) {
                          return true;
                        }

                        return (
                          dayjs(endDate) > dayjs(formValues.startDate) ||
                          "Время окончания события не может быть раньше начала"
                        );
                      },
                    },
                  })}
                  type="datetime-local"
                  className={`input-event ${
                    errors.startDate ? "input-failed" : ""
                  }`}
                />
                {errors.endDate?.type === "required" && (
                  <p className="font-failed">Пожалуйста, введите конец</p>
                )}
                {(errors.endDate?.type === "isInWorkingHours" ||
                  errors.endDate?.type === "isSameDay" ||
                  errors.endDate?.type === "isGreaterThanStartDate") && (
                  <p className="font-failed">{errors.endDate.message}</p>
                )}
                <label>Категория:</label>
                <select
                  id="category"
                  {...register("category")}
                  className="input-event"
                >
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
                  {...register("description")}
                  type="text"
                  className={`input-event ${
                    errors.startDate ? "input-failed" : ""
                  }`}
                />
                <input
                  type="submit"
                  value="Добавить событие"
                  className="button-event"
                />
              </div>
            </form>
          </div>
        )}
      </Popup>
    </div>
  );
}
