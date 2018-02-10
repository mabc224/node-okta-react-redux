import axios from "axios/index";

export const changePasswordError = (error) => ({
    type: 'CHANGE_PASSWORD_ERROR',
    payload: error
});

export const changePasswordSuccess = (data) => ({
    type: 'CHANGE_PASSWORD_SUCCESS',
    payload: data
});

export const changePasswordApiCall = (data) => {
    return dispatch => {

        if (!data.oldPassword || !data.newPassword){
            dispatch(changePasswordError('New and Old, both password fields are required'));
            setTimeout(() => {
                dispatch(changePasswordError(null));
            }, 3000)
            return;
        } else if (data.oldPassword.length < 8){
            dispatch(changePasswordError('Old password length must be minimum 8 characters'));
            setTimeout(() => {
                dispatch(changePasswordError(null));
            }, 3000)
            return;
        } else if (data.newPassword.length < 8){
            dispatch(changePasswordError('New password length must be minimum 8 characters'));
            setTimeout(() => {
                dispatch(changePasswordError(null));
            }, 3000)
            return;
        }

        return axios({
            method: 'post',
            url: '/api/users/change_password',
            data: data,
            config: {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        }).then(json => {
            dispatch(changePasswordSuccess("Password Changed"));
            setTimeout(() => {
                dispatch(changePasswordSuccess(null));
            }, 3000)
        }).catch(err => {
            dispatch(changePasswordError(err.message));
            setTimeout(() => {
                dispatch(changePasswordError(null));
            }, 3000)
        });
    };
};