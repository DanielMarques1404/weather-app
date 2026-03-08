import Axios from 'axios';

export const axios = Axios.create({
    baseURL: 'https://geocoding-api.open-meteo.com/v1/',
});

export function get(url: string) {
    return axios.get(url).then((response) => response.data);
}

export function post(url: string, data?: any, params?: any) {
    return axios.post(url, data, params).then((response) => response.data);
}

export function put(url: string, data?: any, params?: any) {
    return axios.put(url, data, params).then((response) => response.data);
}

export function del(url: string) {
    return axios.delete(url).then((response) => response.data);
}