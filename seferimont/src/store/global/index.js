const { createSlice } = require("@reduxjs/toolkit");

let isUserAuthenticated = false;
let user = null;
if (typeof window !== "undefined") {
  isUserAuthenticated = localStorage.getItem("user") ? true : false;
  user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  console.log(JSON.parse(localStorage.getItem("user")));
}
const global = createSlice({
  name: "global",
  initialState: {
    isAuthenticated: isUserAuthenticated,
    user: user,
  },
  reducers: {
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
  },
});

export const { setIsAuthenticated, setUser } = global.actions;
export default global.reducer;
