
import { createSelector } from "reselect";

export const isLoadingRegister = (state: { createUser: { loading: boolean; }; }) => state.createUser.loading
export const hasErrRegister = (state: { createUser: { hasError: boolean; }; }) => state.createUser.hasError
export const confirmRegiter = (state: { createUser: { response: {  confirmCode: string; }; }; }) => state.createUser.response.confirmCode;
export const user_idRegiter = (state: { createUser: { response: { user_id : string }; }; }) => state.createUser.response.user_id;
export const successRegiter = (state: { createUser: { response: {  code: number}; }; }) => state.createUser.response.code;
export const confirmSuccess = (state : { confirmUser :{  response : {message : string,status : number} } }) => state.confirmUser.response.status;
export const confirmMesage = (state : { confirmUser :{  response : {message : string,status : number} } }) => state.confirmUser.response.message;
export const completedRegisterStatus = (state : { createUser : {response :{ code : number} }}) => state.createUser.response.code

export const messageErr = (state : {userLogged: { err : { message : string}}})=> state.userLogged.err.message
export const messageSuccess = (state : {userLogged: { response : { message : string}}})=> state.userLogged.response.message

export const inviteSelector = (state : {invite : { response : {}}}) => state.invite.response

export const resultData = ( state : { searchData : { response : any[]}}) => state.searchData.response

export const profileSelector = (state : {getProfile :{response: {status : number, result : any[]}}}) => state.getProfile.response

export const setChatWindow = ( state : {chatWindow :{isOpen : boolean} })=> state.chatWindow.isOpen
export const getUserIdChatWindow = ( state : {chatWindow :{userId : string} })=> state.chatWindow.userId
export const getChatData = (state : { getChat : { data : any[]}}) => state.getChat.data
export const loadMoreSelector = (state : { getChat : {hasMore : boolean}}) => state.getChat.hasMore
export const inputChatData = ( state : { inputChat : {inputValue : string}})=> state.inputChat.inputValue

export const previewChatSelector = (state : { previewChat : { data : any[]}}) =>state.previewChat.data
export const dataRoomSelector = (state : { previewChat : { dataRoom : any[]}} ) => state.previewChat.dataRoom
export const roomNameSelector = (state : { previewChat : { selectedRoom : any[]}} ) => state.previewChat.selectedRoom
export const loggedUserSelector = (state : { previewChat : { loggedUser : any}} ) => state.previewChat.loggedUser

export const inviteUserSelector = (state : { createChat : { data : string}}) => state.createChat.data
export const permissionSelector = (state : { createChat  : { permisionBoard : any[]}}) => state.createChat.permisionBoard
export const selectedUserSelector = (state : { createChat : { selectedUser : string}}) => state.createChat.selectedUser

export const boardDataSelector = (state : { getBoard : { data : {}}})=> state.getBoard.data


export const permissionWriteStatus = createSelector(
    boardDataSelector,
    loggedUserSelector,
    (boardData, loggedUser) => {
        const result = boardData.board?.memberCanWrite?.some(member => member.user_id === loggedUser.user_id);    
        return result
    }
  );