import axios from 'axios';
import {apiRouteConsume} from './consts';

const api = axios.create({
  baseURL: apiRouteConsume,
});

export default api;
