export const getEventsByDate = async (date) => {
  const response = await fetch(`/getEventsByDate?date=${date}`, {
    method: "GET",
  });

  return await response.json();
};
export const addEvent = async (event) => {
  const response = await fetch(`/addEvent`, {
    method: "POST",
    body: JSON.stringify(event),
  });

  return await response.json();
};
