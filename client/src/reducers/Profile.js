const initialState = {
    error: null,
    success: ''
};

const profile = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_PASSWORD_SUCCESS':
            return Object.assign({}, state, {error: null, success: action.payload});
        case 'CHANGE_PASSWORD_ERROR':
            return Object.assign({}, state, {error: action.payload, success: null});
        default:
            return state;
    }
};

export default profile;