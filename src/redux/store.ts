import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "./rootReducer"

export default configureStore<any>({
  reducer: rootReducer,
});
