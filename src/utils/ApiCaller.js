import Axios from 'axios';
import objectAssign from 'object-assign';
import {API_ROOT_URL} from '../configurations';
import LocalStorageUtils from './LocalStorageUtils';

export const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${LocalStorageUtils.getToken()}`,
  };
};

export const request = (endpoint, method, headers = {}, params = {}, body = {}) => {
  return Axios({
    url: API_ROOT_URL + endpoint,
    method: method,
    headers: objectAssign(getHeaders(), headers),
    params: objectAssign(params),
    data: body,
  });
};

export const get = (endpoint, params = {}, headers = {}) => {
  return request(endpoint, 'GET', headers, params);
};

export const post = (endpoint, body = {}, params = {}, headers = {}) => {
  return request(endpoint, 'POST', headers, params, body);
};

export const put = (endpoint, body = {}, params = {}, headers = {}) => {
  return request(endpoint, 'PUT', headers, params, body);
};

export const remove = (endpoint, body = {}, params = {}, headers = {}) => {
  return request(endpoint, 'DELETE', headers, params, body);
};
