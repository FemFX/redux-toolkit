import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUSer } from "../../types/User";
import { fetchUsersAction } from "../actionCreators";

interface userState {
  users: IUSer[];
  isLoading: boolean;
  error: string;
  count: number;
}
const initialState: userState = {
  users: [],
  isLoading: false,
  error: "",
  count: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // fetchUsers(state) {
    //   state.isLoading = true;
    // },
    // successFetchUsers(state, action: PayloadAction<IUSer[]>) {
    //   state.isLoading = false;
    //   state.users = action.payload;
    //   state.error = "";
    // },
    // errorFetchUsers(state, action: PayloadAction<string>) {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
    increment(state, action: PayloadAction<number>) {
      state.count += action.payload;
    },
  },
  extraReducers: {
    [fetchUsersAction.fulfilled.type]: (
      state,
      action: PayloadAction<IUSer[]>
    ) => {
      state.isLoading = false;
      state.users = action.payload;
      state.error = "";
    },
    [fetchUsersAction.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchUsersAction.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
