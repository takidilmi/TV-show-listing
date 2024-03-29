import axios from 'axios';

const BASE_URL = 'https://api.tvmaze.com';

export const getShows = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/shows`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    if (error.response && error.response.status === 429) {
      throw new Error(
        'You have reached the limited rate of calls, at max 20 per 10 second'
      );
    }
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
export const getShowCast = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/shows/${id}?embed=cast`);
    return response.data._embedded.cast;
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  }
};
export const getShowCrew = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/shows/${id}/crew`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  }
};
