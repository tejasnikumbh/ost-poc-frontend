import axios from 'axios';

export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const VIEW_PROFILE = 'VIEW_PROFILE';
export const FETCH_QUIZ = 'FETCH_QUIZ';
export const SUBMIT_QUIZ = 'SUBMIT_QUIZ';

const ROOT_URL = "";

export function signup(email, password) {
  // Regex to put in apt name
  const name = "OST USER";
  const request = axios.post('http://localhost:3000/users/signup', {
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
  const request = axios.post('http://localhost:3000/users/login', {
    email,
    password
  });
  return {
    type: LOGIN,
    payload: request
  }
}

export function logout(authToken) {
  const request = axios.delete('http://localhost:3000/users/logout', {
    headers: {
      'x-auth': authToken
    }
  });
  return {
    type: LOGOUT,
    payload: request
  }
}

export function fetchProfile(authToken) {
  const request = axios.get('http://localhost:3000/users/profile', {
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
  const request = axios.get(`http://localhost:3000/quiz/${id}`, {
    headers: {
      'x-auth': authToken
    }
  });
  return {
    type: FETCH_QUIZ,
    payload: request
  }
}

export function submitQuiz(authToken, body, callback) {
  const request = axios.post(`http://localhost:3000/quiz/${body._id}`, body, {
    headers: {
      'x-auth': authToken
    }
  }).then(() => callback());
  return {
    type: SUBMIT_QUIZ,
    payload: request
  }
}
