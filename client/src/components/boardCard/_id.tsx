// Board Details
import Container from '@mui/material/Container'
// import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './boardBar/BoardBar'
import BoardContent from './boardContent/BoardContent'
import React, { FC,useEffect } from 'react';
import {useParams} from "react-router-dom"
import {getBoardRequest} from "../redux/slices/getBoard"
import {useDispatch,useSelector} from "react-redux"
import {boardDataSelector} from "../redux/selectors/selector"
import axios from 'axios';
import {Modal} from "antd"
import {setLoggedUserRequest} from "../redux/slices/getPreviewChat"

const ENDPOINT = "http://localhost:3000";


interface ParamData{
    userId : string,
    boardId : string
} 

const Board: FC = () => {
    const userId_boardId= useParams()
    const userID = userId_boardId.userId
    const boardId = userId_boardId.boardId
  const dispatch = useDispatch()

  const boardData = useSelector(boardDataSelector)
  console.log(boardData);
  
useEffect(()=>{
    const fetchAut = async ( ) => {
        try {
            const response = await axios.post(
                `${ENDPOINT}/user/get-token`,
                {},
                { withCredentials: true }
              );
                const userInfo = {
                    username : response.data.username,
                    user_id : response.data.userId
                }
                dispatch(setLoggedUserRequest(userInfo))
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
    fetchAut()
},[])

   useEffect(()=>{
    const payload = {
        userId : userID,
        boardId : boardId
    }
    dispatch(getBoardRequest(payload))
   },[]) 
    

    return (
        <Container disableGutters={true} maxWidth={false} sx={{ height: '100vh' }}>
            {/* <AppBar /> */}
            <BoardBar board={boardData?.board} />
            <BoardContent board={boardData?.board} />
        </Container>
    )
}

export default Board