import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false
}

const isLoadingContentSlice = createSlice({
    name: 'isLoadingContentSlice',
    initialState,
    reducers:{
        changeLoadingState:((state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        })
    }
})

export const {changeLoadingState} = isLoadingContentSlice.actions

export default isLoadingContentSlice.reducer