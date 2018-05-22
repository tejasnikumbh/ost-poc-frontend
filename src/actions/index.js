import axios from 'axios';

export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const REQUEST_TOKENS = 'REQUEST_TOKENS';
export const VIEW_PROFILE = 'VIEW_PROFILE';
export const FETCH_QUIZ = 'FETCH_QUIZ';
export const SUBMIT_QUIZ = 'SUBMIT_QUIZ';

const ROOT_URL = "https://ost-alpha-backend.herokuapp.com";
//const ROOT_URL = "http://localhost:3000";

export function signup(email, password) {
  // Regex to put in apt name
  const name = "OST USER";
  const request = axios.post(`${ROOT_URL}/users/signup`, {
    name,
    email,
    password
  });
  return {
    type: SIGN_UP,
    payload: request
  }
}

export function login(email, password) {
  const request = axios.post(`${ROOT_URL}/users/login`, {
    email,
    password
  });
  return {
    type: LOGIN,
    payload: request
  }
}

export function logout(authToken) {
  const request = axios.delete(`${ROOT_URL}/users/logout`, {
    headers: {
      'x-auth': authToken
    }
  });
  return {
    type: LOGOUT,
    payload: request
  }
}

export function requestTokens(authToken, body = {amount: 10}) {
  const request = axios.post(`${ROOT_URL}/users/request_tokens`, body, {
    headers: {
      'x-auth': authToken
    }
  }).then((data) => {
    return Promise.resolve(data);
  }).catch((err) => {
    return Promise.reject(err);
  });
  return {
    type: REQUEST_TOKENS,
    payload: request
  }
}

export function fetchProfile(authToken) {
  const request = axios.get(`${ROOT_URL}/users/profile`, {
    headers: {
      'x-auth': authToken
    }
  }).then((data) => {
    return Promise.resolve(data);
  }).catch((err) => {
    return Promise.reject(err);
  });
  return {
    type: VIEW_PROFILE,
    payload: request
  }
}

export function fetchQuiz(authToken, id) {
  const request = axios.get(`${ROOT_URL}/quiz/${id}`, {
    headers: {
      'x-auth': authToken
    }
  });
  return {
    type: FETCH_QUIZ,
    payload: request
  }
}

export function submitQuiz(authToken, body) {
  const request = axios.post(`${ROOT_URL}/quiz/${body._id}`, body, {
    headers: {
      'x-auth': authToken
    }
  }).then((data) => {
    return Promise.resolve(data);
  }).catch((e) => {
    return Promise.reject(e);
  });
  return {
    type: SUBMIT_QUIZ,
    payload: request
  }
}
