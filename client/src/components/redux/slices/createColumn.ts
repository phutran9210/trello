import {createSlice,PayloadAction} from "@reduxjs/toolkit"
import {PayloadCard,PayloadCreateClumn} from "../../interfaces/board"
 
const createColumn = createSlice({
    name : "create_column",
    initialState : {
        loading : false,
        data : {},
        error : {}
    },
    reducers : {
        createColumnRequest : (state, action : PayloadAction<PayloadCreateClumn>) =>{
            state.loading = true
        },
        createColumnSuccess : (state, action) =>{
            state.loading = false,
            state.data = action.payload
        },
        createColumnFailure : (state, action) =>{
            state.loading = false,
            state.data = action.payload
        },
    }
})

export const {createColumnRequest,createColumnSuccess,createColumnFailure} = createColumn.actions
export default createColumn.reducer