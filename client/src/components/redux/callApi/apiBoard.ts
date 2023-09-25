import axios from "axios";
import { PayloadCard,PayloadCreateClumn,DragColumnPayload } from "../../interfaces/board";

const url = "http://localhost:3000"

export const fetchPermission = (payload : {data : string}) =>
axios.post(`${url}/user/createchatsearch`,payload, { withCredentials: true });

export const fetchCreateBoard = (payload : any) =>
axios.post(`${url}/board`,payload, { withCredentials: true });

export const fetchBoard = ( userId : string, boardId : string) =>
axios.get(`${url}/board/${userId}/myboard/${boardId}`,{ withCredentials: true });

export const fetchCreateCard = (payload : PayloadCard) =>
axios.post(`${url}/board/card`,payload, { withCredentials: true });

export const fetchCreateColumn = (payload : PayloadCreateClumn) =>
axios.post(`${url}/board/column`,payload, { withCredentials: true });

export const fetchOrderColumn = (payload : DragColumnPayload) =>
axios.patch(`${url}/board/order-column`,payload, { withCredentials: true });