import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createAction, createReducer } from '@reduxjs/toolkit';

export const authApprove = createAction('setting/AUTH_APPROVE');
export const authReject = createAction('setting/AUTH_REJECT');
export const saveConfig = createAction('setting/SAVE_CONFIG');
export const saveTraveler = createAction('newTFF/SAVE_TRAVELER');
export const saveRexissxRes = createAction('newTFF/SAVE_REXISSX_RES');

const initialState = { 
    authStatus: (localStorage.getItem("authStatus") === 'true'),
    token: localStorage.getItem("token"),
    config: JSON.parse(localStorage.getItem("config")),
    issuing: {
        traveler: {
            passportNo: '',
            passportNltyCd: '',
            passportFirstName: '',
            passportLastName: '',
            birthYmd: '',
            genderCcd: ''
        }
    },
    rexissxRes: {}
};

const reducer = createReducer(initialState, {
    [authApprove] : (state, { payload: token}) => ({...state, authStatus: true, token: token}),
    [authReject] : (state, action) => { 
        localStorage.clear(); 
        return {...state, authStatus: false, token: ''}},
    [saveConfig] : (state, { payload }) => ({...state, config: payload}),
    [saveTraveler] : (state, { payload }) => ({
        ...state, 
        issuing: {
            traveler: payload
        }
    }),
    [saveRexissxRes] : (state, { payload }) => ({ ...state, rexissxRes: payload })
});

const store = createStore(reducer, composeWithDevTools());

export default store;