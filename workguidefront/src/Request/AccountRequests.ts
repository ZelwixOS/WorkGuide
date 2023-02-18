import axios from 'axios';

import Login from '../Types/Login';
import Register from '../Types/Register';
import ServerResponse from '../Types/ServerResponse';
import UserMainInfo from '../Types/UserMainInfo';

const serverAnswers = {
  noCommand: 0,
  signedIn: 3,
  userNotFound: 10,
};

const logInRequest = async (logInData: Login): Promise<ServerResponse> =>
  (await axios.post('/api/Account/Login', logInData)).data;

const registrationRequest = async (registrationData: Register): Promise<ServerResponse> =>
  (await axios.post('/api/Account/Register', registrationData)).data;

const getRole = async (): Promise<string> => (await axios.get('/api/Account/Role')).data;

const getUserInfo = async (): Promise<UserMainInfo> => (await axios.get('/api/Account/GetCurrentUserInfo')).data;

const logOut = async (): Promise<string> => (await axios.post('/api/Account/LogOut')).data;

export {
  serverAnswers,
  logInRequest,
  registrationRequest,
  getRole,
  getUserInfo,
  logOut,
};
