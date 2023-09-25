import React, { useState, FormEvent } from 'react';
import { Button, TextField, Typography, Container, Snackbar,Alert } from '@mui/material';
import axios from 'axios';
import {Modal} from "antd"
import { useLocation,useNavigate  } from 'react-router-dom';


const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
interface FormData {
    email: string;
  }

const ResetMK: React.FC = () => {
 const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [formData, setFormData] = useState<FormData>({
    email: "", 
  });

  const [errorText, setErrorText] = useState({
    email: "",  
  });

  const navigate = useNavigate()

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  console.log(searchParams);
  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
        email : formData.email
    }

    if (!emailPattern.test(formData.email)) {
        setSnackbarMessage("Invalid email format!");
        setOpenSnackbar(true);
        return;
    }

    await axios.post("http://localhost:3000/user/reconfirm/renewpassword",payload)
    .then((response)=>{
        if (response.data.status === 200) {
          Modal.success({
            title : "Success",
            content : "We received a request to reset the password for your account.",
            onOk : (()=>{
              navigate("/")
            })
          })
        }
        
    })
    .catch((err)=>{
        if (err.response.data.statusCode === 404) {
            Modal.error({
                title: "An error has occurred",
                content:`${err.response.data.message}` ,
                okText: 'Close',              
              });  
        }
    })

  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (value && !emailPattern.test(value)) {
        setErrorText(prev => ({ ...prev, email: "The email format is incorrect . " }));
      } else {
        setErrorText(prev => ({ ...prev, email: "" }));
      }
  };

  return (
    <div  style={{  margin: "5em auto",
    width: "75%",
    padding: "2em"}}>
    <Container component="main" maxWidth="xs">
      <Typography variant="h5" align="center">
      Retrieve Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoFocus
          onChange={handleEmailChange}
          error={Boolean(errorText.email)}
          helperText={errorText.email}
          FormHelperTextProps={{ sx: { ml: "0.1em", fontSize: "0.9rem", color: 'red' } }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Send Request
        </Button>
      </form>
      <Snackbar
         open={openSnackbar} autoHideDuration={6000} 
         onClose={() => setOpenSnackbar(false)}
         anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
         >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" variant="filled">
         {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
    </div>
  );
};

export default ResetMK;
