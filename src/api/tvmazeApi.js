import axios from 'axios';

const BASE_URL = 'https://api.tvmaze.com';

export const getShows = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/shows`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  }
};

export const getShowDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/shows/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  }
};
