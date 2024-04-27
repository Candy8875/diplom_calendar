import { http } from "msw";
import { v4 as uuidv4 } from "uuid";

export const handlers = [
  http.get("*/getEventsByDate*", ({ request }) => {
    let events = [];

    if (request.url.includes("2024-04-11")) {
      events = [
        {
          id: uuidv4(),
          title: "Написать отчёт",
          category: "important",
          description: "Отчёт по выполненной работе",
          startDate: "2024-04-11T06:00:00Z",
          endDate: "2024-04-11T06:30:00Z",
        },
        {
          id: uuidv4(),
          title: "Подготовить документ",
          category: "important",
          description: "Подготовить ТЗ",
          startDate: "2024-04-11T08:00:00Z",
          endDate: "2024-04-11T09:30:00Z",
        },
        {
          id: uuidv4(),
          title: "Встреча с командой",
          category: "team-meeting",
          description: "По видео-звонку",
          startDate: "2024-04-11T12:30:00Z",
          endDate: "2024-04-11T13:00:00Z",
        },
        {
          id: uuidv4(),
          title: "Конференция",
          category: "conference",
          description: "По новому проекту",
          startDate: "2024-04-11T14:30:00Z",
          endDate: "2024-04-11T15:30:00Z",
        },
      ];
    }
    if (request.url.includes("2024-04-20")) {
      events = [
        {
          id: uuidv4(),
          title: "Встреча с руководителем",
          category: "meeting",
          description: "в Ярославле",
          startDate: "2024-04-12T13:00:00Z",
          endDate: "2024-04-12T13:30:00Z",
        },
      ];
    }

    return new Response(JSON.stringify(events), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  }),
];
