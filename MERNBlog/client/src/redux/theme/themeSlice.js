import { createSlice } from "@reduxjs/toolkit";

const initialState={
    theme:'light'
}

const themeSlice=createSlice({

    name:'theme',
    initialState,
    reducers:{
        toogleThems:(state)=>{
            state.theme=state.theme==='light'?'dark':'light';
        },
    }
})
export const{toogleThems}=themeSlice.actions;
export default themeSlice.reducer;