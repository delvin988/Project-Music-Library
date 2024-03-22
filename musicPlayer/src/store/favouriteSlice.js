import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const favouriteSlice = createSlice({
   name: "favourite",
   initialState: {
      data: [],
   },
   reducers: {
      fetchSuccess(state, { payload }) {
         state.data = payload;
      },
   },
});

export const { fetchSuccess } = favouriteSlice.actions;

export function fetchDataFavourite(){
    return async function fetchData(dispatch) {
        try {
           const { data } = await axios({
              method: "get",
              url: "http://localhost:3000/favourite",
              headers: {
                 Authorization: "Bearer " + localStorage.getItem("access_token"),
              },
           });
           dispatch(fetchSuccess(data));
           console.log(data);
        } catch (error) {
           console.log(error);
        }
     }
}

export const favouriteReducer = favouriteSlice.reducer;
