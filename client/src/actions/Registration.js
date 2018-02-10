import axios from 'axios';
import { loginApiCall } from './Login';

export const registrationError = (error) => ({
    type: 'REGISTRATION_ERROR',
    payload: error
});

export const registrationSuccess = () => ({
    type: 'REGISTRATION_SUCCESS'
});

export const registrationApiCall = (oktaAuth, data) => {
    console.log(data);
    return dispatch => {
        return axios({
            method: 'post',
            url: '/api/users',
            data: data,
            config: {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        })
            .then(json => {
                dispatch(registrationSuccess());
                dispatch(loginApiCall(oktaAuth, data.email, data.password));
            })
            .catch(err => {
                console.log(err);
                dispatch(registrationError(err.message))
            });
    };
};