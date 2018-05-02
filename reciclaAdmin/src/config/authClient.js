import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'admin-on-rest';
import axios from 'axios';
import AppConfig from './config'
import sha256 from 'sha256'

export default (type, params) => {
    // called when the user attempts to log in
    if (type === AUTH_LOGIN) {
        var username = params.username;
        var password = sha256(params.password);

        const data = {
            "email": username,
            "password": password
        };

        var headers = {
            'Content-Type': 'application/json',
        }

        return axios.post(AppConfig.apiEndPoint + '/users/login', data, headers).then(function (response) {
            if (response.data.type === "Admin") {
                localStorage.setItem('username', username);
                return Promise.resolve();
            }
            else {
                return Promise.reject();
            }
        }).catch(function (error) {
            return Promise.reject();
        });
    }
    // called when the user clicks on the logout button
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('username');
        return Promise.resolve();
    }
    // called when the API returns an error
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    // called when the user navigates to a new location
    if (type === AUTH_CHECK) {
        return localStorage.getItem('username') ? Promise.resolve() : Promise.reject();
    }
    return Promise.reject('Unknown method');
};