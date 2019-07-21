import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL
});

export const getPing = async () => {
  const resp = await api.get(`/ping`);
  return resp.data;
}

export const createUser = async (newUser) => {
  const resp = await api.post(`/users`, newUser);
  // localStorage.setItem('name', newUser.name);
  storeToken(resp.data);
  return resp.data.token;
}

export const getEncouragement = async () => {
  const resp = await api.get(`/encourage`);
  return resp.data;
}

export const storeToken = (token) => {
  localStorage.setItem('authToken', token);
  api.defaults.headers.common.authorization = `Bearer ${token}`;
}

export const loginUser = async (userData) => {
  const resp = await api.post(`/users/login`, userData);
  const { user, token } = resp.data;
  storeToken(token);
  return user;
}

export const createTweet = async (tweetData) => {
  await api.post(`/tweets`, tweetData);
}

export const getAllTweets = async () => {
  const resp = await api.get(`/tweets`);
  return resp.data;
}

export const deleteTweet = async (id) => {
  await api.delete(`/tweets/${id}`);
}

export const verifyToken = async () => {
  const token = localStorage.getItem('authToken');
  if (token !== null) {
    try {
      const resp = await api.get('/users/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      storeToken(token);
      return resp.data.user;
    } catch (e) {
      console.log(e.message);
      console.log('invalid token');
    }
  }
};

export const updateTweet = async (tweetUpdate) => {
  const { id, ...data } = tweetUpdate;
  await api.put(`/tweets/${id}`, data);
}
