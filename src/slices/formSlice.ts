import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    data:{
    userId: null,
    title: "",
    body: "",
    id: null,
    editEnabled: false}
}


const formSlice = createSlice({
    name:"form",
    initialState,
    reducers:{
        edit: (state, action: PayloadAction<any>) => {
            
            state.data = {...action.payload, editEnabled:true}
        },
        reset: (state) => {
            state.data = {...initialState.data}
        }
    }

})

export const {edit, reset} = formSlice.actions;

export default formSlice.reducer;