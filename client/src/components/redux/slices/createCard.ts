import {createSlice,PayloadAction} from "@reduxjs/toolkit"
import {PayloadCard} from "../../interfaces/board"
 
const createCard = createSlice({
    name : "create_card",
    initialState : {
        loading : false,
        data : {},
        error : {}
    },
    reducers : {
        createCardRequest : (state, action : PayloadAction<PayloadCard>) =>{
            state.loading = true
        },
        createCardSuccess : (state, action : PayloadAction<PayloadCard>) =>{
            state.loading = false,
            state.data = action.payload
        },
        createCardFailure : (state, action : PayloadAction<PayloadCard>) =>{
            state.loading = false,
            state.data = action.payload
        },
    }
})

export const {createCardRequest,createCardSuccess,createCardFailure} = createCard.actions
export default createCard.reducer