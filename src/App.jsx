import "./App.css";
import EventsDay from "./EventsDay";
import TableCalendar from "./TableCalendar";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import localizedFormat from "dayjs/plugin/localizedFormat";
import weekday from "dayjs/plugin/weekday"; // Importing the weekday plugin
import MoreInfoEvents from "./MoreInfoEvents";
import { CalendarContextProvider } from "./store/CalendarContextProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./query/queryClient";

dayjs.extend(weekday);
dayjs.extend(localizedFormat);
dayjs.locale("ru");

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CalendarContextProvider>
        <div className="calendar">
          <TableCalendar />
          <div className="info-event">
            <EventsDay />
            <MoreInfoEvents />
          </div>
        </div>
      </CalendarContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
