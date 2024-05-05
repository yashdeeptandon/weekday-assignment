import { configureStore, combineReducers } from "@reduxjs/toolkit";
import LandingPageReducer from "../redux/reducers/LandingPage/LandingPageSlice";

const rootReducer = combineReducers({ LandingPage: LandingPageReducer });

const store = configureStore({
  reducer: rootReducer,
});

export default store;
