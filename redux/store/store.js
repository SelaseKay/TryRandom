import { configureStore } from "@reduxjs/toolkit";
import socketMiddleware from "../middleware/socketMiddleware";
import socketReducer from "../reducers/socketSlice";

const store = configureStore({
    reducer: {
        socket: socketReducer
      },
      middleware: [socketMiddleware],
})

export default store