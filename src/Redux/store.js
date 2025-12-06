import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./sliceNotes"

export const store=configureStore({
   reducer:{
     notes:noteReducer
   }
})