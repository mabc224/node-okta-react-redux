const initialState = {
    sessionToken: null,
    error: null
};


const registration = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGOUT':
            return Object.assign({}, state, {sessionToken: null, error: null});
        case 'LOGIN_ERROR':
            return Object.assign({}, state, {sessionToken: null, error: action.payload});
        case 'LOGIN_SUCCESS':
            return Object.assign({}, state, {sessionToken: action.payload, error: null});
        default:
            return state;
    }
};

export default registration;