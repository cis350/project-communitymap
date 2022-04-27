import axios from 'axios';

const domain = 'http://localhost:8080';

export const addEvent = async (
  title,
  date,
  location,
  description,
  imageURL,
  creator
) => {
  const response = await axios.post(`${domain}/events`, {
    name: title,
    description: description,
    date: date,
    location: location,
    imagURL: imageURL,
    creator: creator,
  });
  // note: location needs to be a {latitude: X, longitude: Y} object
  return response.status;
};

export const signup = async (user, title) => {
  const response = await axios.put(`${domain}/signup`);
  return response.status;
};

export const getEventsList = async () => {
  const response = await axios.get(`${domain}/events`);
  return response.data;
};
