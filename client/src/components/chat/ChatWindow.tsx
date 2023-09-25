  import React, {
    useState,
    FC,
    KeyboardEvent,
    ChangeEvent,
    useEffect,
    useMemo,
    UIEvent,
    useRef,useLayoutEffect
  } from "react";
  import "./chatWindow.css";
  import { setChatWindow,getChatData,loadMoreSelector } from "../redux/selectors/selector";
  import { useSelector, } from "react-redux";
  import {updateInputValue} from "../redux/slices/inputChat"
  import { useDispatch } from "react-redux";
import {getMoreChat} from "../redux/slices/getChat"
import {getOtherUsernames} from "../../helper/config"



  interface Message {
    sender_id: string;
    sender_name: string;
    content: string;
    create_at: string;
  }

  interface Participant {
    user_id: string;
    username: string;
  }

  interface Conversation {
    room_name: string;
    participants: Participant[];
    messages: Message[];
  }



  const ChatWindow: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [isScrollingUp, setIsScrollingUp] = useState<boolean>(false);
    const isLoadMore = useSelector(loadMoreSelector)
    const isOpen = useSelector(setChatWindow);
    const data : Conversation[] = useSelector(getChatData)
    console.log("dataChat",data);
    const dispatch = useDispatch()
    const endOfMessagesRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
      if (!isScrollingUp) {
        scrollToBottom();
      }
    }, [data, isScrollingUp]);



    
    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        if (inputValue.trim() !== "") {
          dispatch(updateInputValue(inputValue)); 
          setInputValue(""); 
      
        }
      }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    
    const scrollToBottom = () => {
      if (endOfMessagesRef.current && !isScrollingUp) {
        endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    const handleScroll = (e : UIEvent<HTMLDivElement> ) => {
      const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

      if (scrollTop === 0) {
        loadMoreMessages();
      }

      const isUserScrollingUp = scrollTop + clientHeight < scrollHeight;
      setIsScrollingUp(isUserScrollingUp);
    };

    const loadMoreMessages = () => {
      if (isLoadMore === false) {
        return
      }else{
        dispatch(getMoreChat(data[0].room_name))
      }
    };

    const loggedUserRaw = localStorage.getItem("loggedUser");
  const loggedUser = loggedUserRaw ? JSON.parse(loggedUserRaw) : null;
  const loggedUserId = loggedUser.user_id;
 

    return (
      
       <>
      
      {isOpen && (
        <div className="chat-window">
          {data?.map((conversation, index) => {
            // Get the list of other usernames for this chat conversation
            const otherUsernames = getOtherUsernames(conversation.participants, loggedUserId);
            
            // Convert the list of usernames to a string
            // Assume it will only return one name in the context of a chat conversation
            const conversationDisplayName = otherUsernames.join(', ');

            return (
              <div key={index} className="chat-conversation"  onScroll={handleScroll}>
                <h3>{conversationDisplayName}</h3>
                <ul>
                  {conversation.messages.map((message, i) => (
                    <li
                      key={i}
                    >{` ${message.sender_name}: ${message.content}`}</li>
                  ))}
                  {data.length - 1 === index && <li ref={endOfMessagesRef} />}
                </ul>
              </div>
            );
          })}
          <input
              type="text"
              value={inputValue}
              onChange={handleInputChange} 
              onKeyDown={handleKeyPress}
          />
        </div>
      )}
    </>
    );
  };

  export default ChatWindow;
