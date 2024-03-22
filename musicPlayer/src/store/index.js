import {configureStore} from "@reduxjs/toolkit"

import { favouriteReducer } from "./favouriteSlice.js"

const store = configureStore({
    reducer: {
        favourite: favouriteReducer,
    }
})

export default store