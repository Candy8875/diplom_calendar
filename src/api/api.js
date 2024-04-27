export const getEventsByDate = async (date) => {
  const response = await fetch(`/getEventsByDate?date=${date}`, {
    method: "GET",
  });

  return await response.json();
};
