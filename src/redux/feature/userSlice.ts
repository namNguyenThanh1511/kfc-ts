import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../model/user";
// sau dau : là để khai báo kiểu dữ liệu  ( kiểu null nếu chưa login | kiểu User nếu đã login)
const initialState: null | User = null;

export const userSlice = createSlice({
  name: "user",
  initialState, //initialState : initialState, : viết tắt khi tên field và tên biến trùng nhau
  reducers: {
    login: (state, action) => action.payload, // user
    logout: () => initialState,
  },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
