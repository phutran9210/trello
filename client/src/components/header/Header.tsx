import React, { useState, useEffect,useRef } from "react";
import type { MenuProps } from "antd";
import socketIOClient from "socket.io-client";
import { Socket } from "socket.io-client";
import { Menu, message } from "antd";
import {
  DownOutlined,
  HolderOutlined,
  IdcardOutlined,
  InfoCircleOutlined,
  LoginOutlined,
  LogoutOutlined,
  NotificationOutlined,
  UserAddOutlined,
  UserOutlined,
  CommentOutlined
} from "@ant-design/icons";
import "./header.css";
import logo from "../../assets/trello-icon-png-21.jpg";
import Search from "./search/Search";
import { useNavigate } from "react-router-dom";
import { resultData,getUserIdChatWindow } from "../redux/selectors/selector";
import { useSelector,useDispatch } from "react-redux";
import ResultModal from "./search/ResultModal";
import {
  openChatWindowRequest,
  closeChatWindow,
} from "../redux/slices/chatWindow";
import {changeChatState,getPreChat} from "../redux/slices/getChat"
import {inputChatData,} from "../redux/selectors/selector"
import ChatWindow from "../chat/ChatWindow";
import axios from "axios";


const ENDPOINT = "http://localhost:3000";

function useAuth() {
  const [isAuthChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/status", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setLoggedIn(true);
        setAuthChecked(true);
      })
      .catch((error) => {
        console.log(error);
        setLoggedIn(false);
        setAuthChecked(true);
      });
  }, []);

  return { isAuthChecked, isLoggedIn };
}

const HeaderContent: React.FC = () => {
  const { isAuthChecked, isLoggedIn } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [loggedId, setLoggedId] = useState("");
  const [currentRoom, setCurrentRoom] = useState<string>("");
  const currentRoomRef = useRef<string>("");
  const currentUserNameRef = useRef<string>("");
  const dispatch = useDispatch();
  const inputChat = useSelector(inputChatData)
  if (!currentRoomRef.current) {
    currentRoomRef.current = currentRoom;
  }

  const choosenUserId = useSelector(getUserIdChatWindow);
  console.log("choosenUserId",choosenUserId);
  
  useEffect(() => {
    if (!choosenUserId) {
       return
    }
      handleUserClick(choosenUserId);
}, [choosenUserId]);



  const [current, setCurrent] = useState("");
  const navigate = useNavigate();
  const resultSearch = useSelector(resultData);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const handleRegisterClick = () => {
    navigate("/register");
  };
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleLogoutClick = async () => {
    await axios
      .post(`http://localhost:3000/user/logout`, {}, { withCredentials: true })
      .then((respone) => {
        if (respone.data === 200) {
          navigate("/");
          window.location.reload();
          return message.success("Đăng xuất thành công");
        }
      })
      .catch((error) => {
        message.error("Đã xảy ra lỗi");
      });
  };

  const goHome = () => {
    navigate("/");
  };

  useEffect (()=>{
    if (!inputChat) {
      return
    }
    const _sendMessage = async () => {
      if (socket && inputChat.trim() !== "") {
   
        const roomname = currentRoom ?  currentRoom : currentRoomRef.current
     
        const messageObject = {
          sender_id: loggedId,
          content: inputChat,
          room: roomname,
        };
        socket.emit("message", messageObject);
        const mesPushToState ={
          content : inputChat,
          create_at : Date.now(),
          sender_id : loggedId,
          sender_name : currentUserNameRef.current
        }
        dispatch(changeChatState({room :  roomname, content :mesPushToState }))
        console.log(mesPushToState);
        
      }
    };
    _sendMessage()
  },[inputChat])

  useEffect(() => {
    const fetchTokenAndInitializeSocket = async () => {
      try {
        const response = await axios.post(
          `${ENDPOINT}/user/get-token`,
          {},
          { withCredentials: true }
        );
        const userId = response.data.userId;
        const username = response.data.username;
        currentUserNameRef.current = username;

        setLoggedId(userId);
        const socket = socketIOClient(ENDPOINT, { query: { userId: userId } });

        setSocket(socket);

        socket.on("message", (data: any) => {
          console.log("đây là data",data);
        const roomCurrent = currentRoom ? currentRoom : currentRoomRef.current

          if (data?.room  === roomCurrent ) {
              const payload: string = data.room;
              dispatch(openChatWindowRequest(payload));
          if (data.content.sender_id !== userId ) {
            dispatch(changeChatState(data))
          }
            
          }
      
        });

        socket.on("error", (error) => {
          message.error(`Error: ${error.message}`);
        });

        socket.on("invite", (data) => {
          console.log(data);
          if (data.room) {
            socket.emit("joinRoom", data.room);
            currentRoomRef.current = data.room;
            dispatch(getPreChat(data.room))
          }
        });

        return () => {
          socket.disconnect();
        };
      } catch (error) {
        console.log(error);
      }
    };

    fetchTokenAndInitializeSocket();
  }, []);

  const handleUserClick = (userId : string) => {
    console.log(userId);
    console.log(loggedId);
    
    const roomId = generateRoomId(loggedId,userId);
    setCurrentRoom(roomId)
    joinRoom(roomId);
    inviteToRoom(userId, roomId);
    dispatch(openChatWindowRequest(roomId));
  };

  const joinRoom = (roomId: string) => {
    console.log(roomId);
    
    if (socket) {
      socket.emit("joinRoom", roomId);
      setCurrentRoom(roomId);
    }
  };

  const inviteToRoom = (recipientId: string, roomId: string) => {
    if (socket) {
      const inviteMessage = {
        sender: loggedId,
        content: `Please join me in room ${roomId}`,
        room: roomId,
      };
      console.log(inviteMessage);
      
      socket.emit("invite", { payload: inviteMessage, recipientId });
    }
  };

  const generateRoomId = (userId: string, loggedId: string) => {
    return [userId, loggedId].sort().join("-");
  };


  const items: MenuProps["items"] = [
    {
      key: "home",
      icon: <HolderOutlined />,
      onClick: goHome,
    },
    {
      key: "logo",
      label: <img src={logo} style={{ width: "10em", marginRight: "0.5em" }} />,
    },
    {
      label: "Workspace",
      icon: <DownOutlined />,
      key: "workspace",
    },
    {
      label: "Starred",
      key: "starred",
      icon: <DownOutlined />,
    },
    {
      label: "Templates",
      key: "templates",
      icon: <DownOutlined />,
    },
    {
      label: "Create",
      key: "create",
    },
    {
      label: <Search />,
      key: "search",
    },
    {
      icon: <NotificationOutlined />,
      key: "notification",
    },
    {
      icon: <InfoCircleOutlined />,
      key: "info",
    },
    {
      icon: <UserOutlined />,
      key: "user",
      children: isLoggedIn
        ? [
            {
              label: "Go chat",
              icon: <CommentOutlined />,
              onClick: () => navigate(`user/${loggedId}/messages`),
            },
            {
              label: "Trang cá nhân",
              icon: <IdcardOutlined />,
              onClick: () => navigate("/user"),
            },
            {
              label: "Đăng xuất",
              icon: <LogoutOutlined />,
              onClick: handleLogoutClick,
            },
          ]
        : [
            {
              label: "Đăng kí",
              icon: <UserAddOutlined />,
              onClick: handleRegisterClick,
            },
            {
              label: "Đăng nhập",
              icon: <LoginOutlined />,
              onClick: handleLoginClick,
            },
          ],
    },
  ];

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      {resultSearch && resultSearch.length > 0 && <ResultModal />}
      <ChatWindow />
    </>
  );
};
export default HeaderContent;
