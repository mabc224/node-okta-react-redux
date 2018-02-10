import { combineReducers } from 'redux';
import registration from './Registration';
import login from "./Login";
import profile from "./Profile";

const OktaAppReducer = combineReducers({
    registration: registration,
    login: login,
    profile: profile
});

export default OktaAppReducer;