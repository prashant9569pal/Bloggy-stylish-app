// Import the createSlice function from the @reduxjs/toolkit package.
// createSlice is used to create a Redux slice, which consists of a set of reducers and actions.
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the user slice of the state.
// This state is used to store user-related data, such as the current user, loading status, and error messages.
const initialState = {
  // `currentUser` holds the currently signed-in user information.
  // It is initialized to null since there is no user signed in at the beginning.
  currentUser: null,
  // `error` holds any error messages related to user operations.
  // It is initialized to null, meaning no errors at the beginning.
  error: null,
  // `loading` is a flag to indicate if a user-related action is in progress.
  // It is initialized to false, meaning no actions in progress at the beginning.
  loading: false,
};

// Use the createSlice function to create a new slice of the Redux state.
// This function automatically generates action creators and action types based on the reducers defined in the slice.
const userSlice = createSlice({
  // Specify the name of the slice. This is useful for referencing the slice's actions and reducers later.
  name: "user",

  // Specify the initial state of the slice.
  initialState,

  // Define the reducers for the user slice.
  // These functions handle state changes based on actions.
  reducers: {
    // Reducer for the "signInStart" action.
    // This action is called when a user sign-in process starts.
    signInStart: (state) => {
      // Set the loading flag to true, indicating that a sign-in process is in progress.
      state.loading = true;
      // Clear any previous errors.
      state.error = null;
    },

    // Reducer for the "signInSuccess" action.
    // This action is called when a user sign-in process succeeds.
    signInSuccess: (state, action) => {
      // Update the `currentUser` state with the payload of the action (the signed-in user data).
      state.currentUser = action.payload;
      // Set loading to false, as the sign-in process has completed successfully.
      state.loading = false;
      // Clear any previous errors.
      state.error = null;
    },

    // Reducer for the "signInFailure" action.
    // This action is called when a user sign-in process fails.
    signInFailure: (state, action) => {
      // Set loading to false, as the sign-in process has completed (but failed).
      state.loading = false;
      // Update the `error` state with the payload of the action (the error message).
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = null;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} = userSlice.actions;

export default userSlice.reducer;
