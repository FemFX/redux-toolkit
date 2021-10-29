import { AppDispatch } from "../index";
import axios from "axios";
import { IUSer } from "../../types/User";
import { userSlice } from "../reducers/UserSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchUsersAction = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(userSlice.actions.fetchUsers());
//     const { data } = await axios.get<IUSer[]>(
//       "https://jsonplaceholder.typicode.com/users"
//     );
//     dispatch(userSlice.actions.successFetchUsers(data));
//   } catch (err: any) {
//     dispatch(userSlice.actions.errorFetchUsers(err.message));
//   }
// };

export const fetchUsersAction = createAsyncThunk(
  "user/fetch",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get<IUSer[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
