import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { PostAPI } from "../services/PostService";
import userReducer from "./reducers/UserSlice";

const rootReducer = combineReducers({
  userReducer,
  [PostAPI.reducerPath]: PostAPI.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(PostAPI.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
