import axios from 'axios';

export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';

export const VIEW_PROFILE = 'VIEW_PROFILE';
export const FETCH_QUIZ = 'FETCH_QUIZ';

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

export function fetchProfile(authToken) {
  const request = axios.get('http://localhost:3000/users/profile', {
    headers: {
      'x-auth': authToken
    }
  });
  return {
    type: VIEW_PROFILE,
    payload: request
  }
}

export function fetchQuiz(authToken) {
  const request = axios.get('http://localhost:3000/quiz', {
    headers: {
      'x-auth': authToken
    }
  });
  return {
    type: FETCH_QUIZ,
    payload: request
  }
}
