import {configureStore} from "@reduxjs/toolkit";
import blogDetails from "./features/getUserSlice";

export const store = configureStore ({
    reducer : {
        app : blogDetails
    }
})