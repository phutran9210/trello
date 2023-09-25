
import React,{useState,useEffect} from 'react';
import { Paper, Typography, Grid,CardContent,Card,CardActionArea} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


type Board = {
    board_id: string;
    title: string;
    description_board: string;
    owner_id: string;
    type_board: "public" | "private"; 
};

type Data = {
    personalBoards: Board[];
    taggedBoards: Board[];
};

const Board: React.FC<Board> = ({ title, description_board,board_id}) => {
    const navigate = useNavigate()

    const loggedUserRaw = localStorage.getItem("loggedUser");
    const loggedUser = loggedUserRaw ? JSON.parse(loggedUserRaw) : null;
    const loggedUserId = loggedUser.user_id;

    const handleBoardClick = (board_id: string) => {
     navigate(`/${loggedUserId}/myboard/${board_id}`)
    }
    return (
        <Paper style={{ padding: '8px', margin: '16px' }} elevation={3}>
        <Card>
            <CardActionArea onClick={() => handleBoardClick(board_id)}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           <h5>{title}</h5>
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {description_board}
          </Typography>
        </CardContent>
      </CardActionArea>
        </Card>
    </Paper>
    );
}

const MainContent: React.FC = () => {
    const [boardData, setBoardData] = useState<Data>()
    console.log("board ???",boardData);
    
    const loggedUserRaw = localStorage.getItem("loggedUser");
    const loggedUser = loggedUserRaw ? JSON.parse(loggedUserRaw) : null;
    const loggedUserId = loggedUser.user_id;

    useEffect(()=>{
        const getBoardData = async ()=>{
            await axios.get(`http://localhost:3000/board/${loggedUserId}/myboard`,{withCredentials : true})
            .then((response)=>{
                setBoardData(response.data)
            })
            .catch((err)=>{
                console.log(err);
                
            })
        }
        getBoardData()
    },[])

    if (!boardData) {
        return (
        <div style={{ padding: '32px' }}>
        <h4>Personal boards</h4>
        <Grid container direction="column">
            <Paper style={{ padding: '8px', margin: '16px' }} elevation={3}>
            <Card>
             <CardActionArea >
         <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              "Please log in to see your Board! "
            </Typography>
            </CardContent>
          </CardActionArea>
             </Card>
         </Paper>
        </Grid>
        <h4 style={{ marginTop: '32px' }}>Tagged boards</h4>
        <Grid container direction="column">
        <Paper style={{ padding: '8px', margin: '16px' }} elevation={3}>
            <Card>
             <CardActionArea >
         <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              "Please log in to see your Board! "
            </Typography>
            </CardContent>
          </CardActionArea>
             </Card>
         </Paper>
        </Grid>
    </div>
        );
    }

    return (
        <div style={{ padding: '32px' }}>
        <h4>Personal boards</h4>
        <Grid container direction="column">
            {boardData?.personalBoards.map((board, index) => (
                <Board key={index} {...board} />
            ))}
        </Grid>
        <h4 style={{ marginTop: '32px' }}>Tagged boards</h4>
        <Grid container direction="column">
            {boardData?.taggedBoards.map((board, index) => (
                <Board key={index} {...board} />
            ))}
        </Grid>
    </div>
    );
}

export default MainContent;
