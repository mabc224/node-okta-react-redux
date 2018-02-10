const initialState = {
    error: null
};

const registration = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTRATION_SUCCESS':
            return Object.assign({}, state, {error: null});
        case 'REGISTRATION_ERROR':
            return Object.assign({}, state, {error: action.payload});
        default:
            return state;
    }
};

export default registration;