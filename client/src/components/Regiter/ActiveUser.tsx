import React,{useEffect} from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import "./activeUser.css"
import { useLocation,useNavigate  } from 'react-router-dom';
import axios from 'axios';
import {Modal} from "antd"

const ActiveUser: React.FC = () =>{
    const navigate = useNavigate()

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const userId = searchParams.get('userId');
    const code = searchParams.get('code');

 useEffect(()=>{
    const activate = async ()=>{
        await axios.get(`http://localhost:3000/user/confirm/activate?userId=${userId}&code=${code}`)
        .then((response)=>{
           if (response.data.status === 200) {
            Modal.success({
                title:"Sign up success !!!",
                content:`${response.data.message}` ,
                onOk : ()=>{
                    navigate("/")
                }
               
              });  
            //  return  navigate("/")
           }       
        })
        .catch((err)=>{            
         Modal.error({
                title:"An error has occurred",
                content:`${err.response.data.message}` ,
                okText: 'Close',
               
              });      
        })
    }
    activate()
 },[])
    
    
    return (
        <Stack spacing={1} style={{width: '100%', height: '100%'}}>
            <Skeleton animation="wave" variant="rounded" width="100%" height="100%" />
        </Stack>
    );
} 

export default ActiveUser;