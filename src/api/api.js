const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const getEventsByDate = async (date) => {
  const response = await fetch(`${apiBaseUrl}/getEventsByDate?date=${date}`, {
    method: "GET",
  });

  return await response.json();
};
export const addEvent = async (event) => {
  const response = await fetch(`${apiBaseUrl}/addEvent`, {
    method: "POST",
    body: JSON.stringify(event),
  });

  return await response.json();
};
