import axios from 'axios';
import { API_END } from '../assets/constants';
import authHeader from './auth-header';

class UserService {
    private token: {'x-access-token': string} = {'x-access-token': ''};
    constructor() {
        const token = authHeader()
        if (!token['x-access-token']) return

        this.token = token
    }
  getPublicContent() {
    return axios.get(API_END + 'all');
  }
  getUserBoard() {
    return axios.get(API_END + 'user', { headers: this.token });
  }
  getModeratorBoard() {
    return axios.get(API_END + 'mod', { headers: this.token });
  }
  getAdminBoard() {
    return axios.get(API_END + 'admin', { headers: this.token });
  }
}
export default new UserService();