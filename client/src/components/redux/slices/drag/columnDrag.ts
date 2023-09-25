import {createSlice,PayloadAction} from "@reduxjs/toolkit"
import {DragColumnPayload} from "../../../interfaces/board"
 
const dragColumn = createSlice({
    name : "drag_column",
    initialState : {
        loading : false,
        data : {},
        error : {}
    },
    reducers : {
        dragColumnRequest : (state, action : PayloadAction<DragColumnPayload>) =>{
            state.loading = true
        },
        dragColumnSuccess : (state, action) =>{
            state.loading = false,
            state.data = action.payload
        },
        dragColumnFailure : (state, action) =>{
            state.loading = false,
            state.data = action.payload
        },
    }
})

export const {dragColumnRequest,dragColumnSuccess,dragColumnFailure} = dragColumn.actions
export default dragColumn.reducer