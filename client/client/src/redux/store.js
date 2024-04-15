// Import necessary functions and modules from the @reduxjs/toolkit and redux-persist packages.
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice"; // Import the user reducer from a local file.
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Import the default storage engine for redux-persist (local storage).

// Combine different reducers into a single root reducer.
const rootReducer = combineReducers({
  // Add the user reducer under the key "user".
  user: userReducer,
});

// Define a persist configuration for the root reducer.
const persistConfig = {
  key: "root", // The key for the persisted state in storage.
  storage, // The storage engine to use (local storage in this case).
  version: 1, // The version of the persisted state, useful for migrations.
};

// Create a persisted reducer using the root reducer and the persist configuration.
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store using the persisted reducer.
export const store = configureStore({
  // Use the persisted reducer as the store's reducer.
  reducer: persistedReducer,
  // Set up the middleware for the store.
  // Disable serializable check in the default middleware.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Create a persistor for the Redux store to handle state persistence.
export const persistor = persistStore(store);
