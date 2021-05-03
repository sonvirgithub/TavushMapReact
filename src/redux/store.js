import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authReducer from "./auth/reducers/authReducer";
import rootReducer from "./rootReducer";
import {composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'


const store = createStore(rootReducer,  composeWithDevTools(applyMiddleware(thunk)));

export default store;