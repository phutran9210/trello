import {createSlice,PayloadAction} from "@reduxjs/toolkit"

const getBoardData = createSlice({
    name : "get_board",
    initialState : {
        loading : false,
        data : {},
        error : null
    },
    reducers : {
        getBoardRequest : (state, action : PayloadAction <any>) =>{
            state.loading = false
        },
        getBoardSuccess : (state, action) =>{
            state.loading = true,
            state.data = action.payload
        },
        getBoardFailure : (state, action) =>{
            state.loading = false,
            state.error = action.payload
        },
        updateCardInColum : (state,action) =>{
            const columnId_in_card = action.payload.column_id
            const index = state.data.board.columns.findIndex(column => column.column_id === columnId_in_card)
        
            if (index !== -1) {
                state.data.board.columns[index].cards.push(action.payload)
            }


        },
        updateNewColumn : (state,action)=>{
            const newColumn = action.payload.newColumn
            const columnId = action.payload.newColumn.column_id
            state.data.board.columnOrderIds.push(columnId)
            state.data.board.columns.push(newColumn)
        }
    }
})

export const {getBoardRequest,getBoardSuccess,getBoardFailure,updateCardInColum,updateNewColumn} = getBoardData.actions
export default getBoardData.reducer