export const logout = () => ({
    type: 'LOGOUT'
});

export const loginError = (error) => ({
    type: 'LOGIN_ERROR',
    payload: error
});

export const loginSuccess = (data) => ({
    type: 'LOGIN_SUCCESS',
    payload: data
});

export const loginApiCall = (oktaAuth, username, password) => {
    return dispatch => {
        return oktaAuth.signIn({
            username: username,
            password: password
        }).then(res => {
            console.log(JSON.stringify(res));
            alert(res);
            dispatch(loginSuccess(res.sessionToken))
        }).catch(err => {
            console.log(err.message + '\n error', err);
            dispatch(loginError(err.message));
        });
    };
};