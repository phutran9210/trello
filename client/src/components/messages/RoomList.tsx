import React,{useEffect} from "react";
import { Collapse, Typography, Button } from "antd";
import styled from "styled-components";
import {useParams} from "react-router-dom"
import {getPreviewChatRequet,selectRoom} from "../redux/slices/getPreviewChat"
import {useDispatch,useSelector} from "react-redux"
import {previewChatSelector} from "../redux/selectors/selector"
import {getOtherUsernames} from "../../helper/config"
const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }

    .add-room {
      color: white;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

const RoomList: React.FC = () => {
  const dispatch = useDispatch()
  const { userID } = useParams();
  const previewChatData = useSelector(previewChatSelector)
  console.log(previewChatData);
  
useEffect(()=>{
  dispatch(getPreviewChatRequet(userID))
},[])

  const setSelectedRoomId = (room_name) => {
    dispatch(selectRoom(room_name))
  };

  const loggedUserRaw = localStorage.getItem("loggedUser");
  const loggedUser = loggedUserRaw ? JSON.parse(loggedUserRaw) : null;
  const loggedUserId = loggedUser.user_id;

  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyled header="Danh sách chat" key="1">
      {previewChatData.map((room, index) => {
          // Get the list of other usernames for this chat room
          const otherUsernames = getOtherUsernames(room.participants, loggedUserId);
          
          // Convert the list of usernames to a string
          const roomDisplayName = otherUsernames.join(', ');

          return (
            <LinkStyled key={index} onClick={() => setSelectedRoomId(room.room_name)}>
              {roomDisplayName}
            </LinkStyled>
          );
        })}
      </PanelStyled>
    </Collapse>
  );
};
export default RoomList;
