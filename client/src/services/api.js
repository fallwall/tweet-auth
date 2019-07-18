import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const getPing = async () => {
  const resp = await axios.get(`${BASE_URL}/ping`);
  return resp.data;
}
 
