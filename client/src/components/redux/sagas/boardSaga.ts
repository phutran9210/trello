import { Effect, takeEvery,call,put,select, takeLatest} from "redux-saga/effects"
import * as api from "../callApi/apiBoard"
import {PayloadCreateClumn} from "../../interfaces/board"
import {createPermissionRequest,createPermissionSuccess,setDefaultPermisionBoardRequest,setDefaultPermisionBoardSuccess} from "../slices/createNewChat"
import {createBoardRequest,createBoardSuccess,createBoardFailure} from "../slices/createBoard"
import {getBoardRequest,getBoardSuccess,getBoardFailure,updateCardInColum,updateNewColumn} from "../slices/getBoard"
import {createCardRequest,createCardSuccess,createCardFailure,} from "../slices/createCard"
import {createColumnRequest,createColumnSuccess,createColumnFailure,} from "../slices/createColumn"
import { Modal } from "antd"
import { PayloadCard ,DragColumnPayload} from "../../interfaces/board"
import {dragColumnRequest,dragColumnSuccess,dragColumnFailure} from "../slices/drag/columnDrag"


function* getPermissionSaga(action : { payload : {data : string}}) : Generator<Effect,any,any>{

try {
    const response = yield call(api.fetchPermission,action.payload)
    yield put(createPermissionSuccess(response.data))
        
} catch (error : any) {
    
}
}

function* createBoardSaga(action : { payload : any}) : Generator<Effect,any,any>{

    try {
        const response = yield call(api.fetchCreateBoard,action.payload)

        yield put(createBoardSuccess(response.data))
    } catch (error : any) {
        
    }
}

function* setDefaultPermissionSaga(action : unknown) : Generator<Effect,any,any>{
    yield put(setDefaultPermisionBoardSuccess()) 
}

function* getBoardDataSaga (action : { payload :any}) : Generator<Effect,any,any>{
    const {userId} = action.payload
    const {boardId} = action.payload
    
try {
    const respone = yield call(api.fetchBoard,userId,boardId)

    yield put(getBoardSuccess(respone.data))
} catch (error : any) {
    if (error) {
        Modal.error({
          title: 'Đã xảy ra lỗi',
          content:`${error.response.data.message}` ,
          okText: 'Close', 
        });  
      }
}
}

function* createCardSaga (action : { payload : PayloadCard}) : Generator<Effect,any,any>{

    try {
        const response = yield call(api.fetchCreateCard,action.payload)

        yield put(updateCardInColum(response.data))
        
    } catch (error) {
        
    }
}

function* createColumnSaga (action : { payload : PayloadCreateClumn}) : Generator<Effect,any,any>{
try {
    const response = yield call(api.fetchCreateColumn,action.payload)
    console.log(response.data);
    yield put(updateNewColumn(response.data))
} catch (error) {
    
}
}

function* dragColumnSaga(action : { payload : DragColumnPayload}): Generator<Effect,any,any>{
try {
    const response = yield call(api.fetchOrderColumn,action.payload)
} catch (error) {
    
}
}    

function* boardSaga() {
 yield   takeEvery(createPermissionRequest,getPermissionSaga)

yield takeEvery(createBoardRequest,createBoardSaga)
yield takeEvery(setDefaultPermisionBoardRequest,setDefaultPermissionSaga)

yield takeEvery(getBoardRequest,getBoardDataSaga)

yield takeEvery(createCardRequest,createCardSaga)

yield takeEvery(createColumnRequest,createColumnSaga)

yield takeLatest(dragColumnRequest,dragColumnSaga)
}
export default boardSaga