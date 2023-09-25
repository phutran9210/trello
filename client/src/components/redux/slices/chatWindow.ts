import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
     isOpen: false,
     userId : null,
     loading : false
    },
  reducers: {
    openChatWindowRequest: (state) => {state.isOpen = false}  
    ,
    openChatWindowSuccess: (state,action) => { 
      state.isOpen = true;  
    },
    closeChatWindow: state => {
      state.isOpen = false
    },
    choosenUserIdRequest : (state)=>{
      state.loading = false
    },
    choosenUserIdSuccess : (state,action)=>{
      state.loading = true;
      state.userId = action.payload
    }
  },
})

export const { openChatWindowSuccess, closeChatWindow,openChatWindowRequest,choosenUserIdRequest,choosenUserIdSuccess } = chatSlice.actions
export default chatSlice.reducer
