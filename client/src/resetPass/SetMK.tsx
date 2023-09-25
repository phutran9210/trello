import React, { useState } from 'react';
import Button from '@mui/material/Button'
import  TextField  from "@mui/material/TextField";
import  Grid  from "@mui/material/Grid";
import  Typography  from "@mui/material/Typography";
import  Container  from "@mui/material/Container";
import  Alert  from "@mui/material/Alert";
import  Snackbar  from "@mui/material/Snackbar";
import axios from 'axios';
import { useLocation,useNavigate  } from 'react-router-dom';
import {Modal} from "antd"

interface FormData {
    password: string;
    confirmPassword: string;
  }

  const passwordPattern = /^[a-zA-Z0-9!@#$%^&*]{8,32}$/;

const SetMK: React.FC = () => {
 const [formData, setFormData] = useState<FormData>({
        password: "",
      confirmPassword: "",
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [errorText, setErrorText] = useState({
        password : "",
        confirmPassword: ""
      });

    const location = useLocation();
    const navigate = useNavigate()
    const searchParams = new URLSearchParams(location.search);

    const code = searchParams.get('token');

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (value && !passwordPattern.test(value)) {
            setErrorText(prev => ({ ...prev, password: "The password can be in regular letters or numbers or include the following special characters: !@#$%^&*." }));
          } else {
            setErrorText(prev => ({ ...prev, password: "" }));
          }
      };

        const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    
        if (value !== formData.password) {
            setErrorText(prev => ({ ...prev, confirmPassword: "Passwords do not match." }));
        } else {
            setErrorText(prev => ({ ...prev, confirmPassword: "" }));
        }
    };

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
         if (formData.password !== formData.confirmPassword) {
            setSnackbarMessage("Passwords do not match!");
            setOpenSnackbar(true);
            return;
        }

        const payload = {
            password :formData.password,
            token : code
        }

       await axios.post("http://localhost:3000/user/reconfirm/new-password",payload)
       .then((response)=>{
        console.log(response);
        
        if (response.data.status === 200) {
          Modal.success({
            title : "Success",
            content : "You have successfully changed your password. Please log in again.",
            onOk : (()=>{
              navigate("/")
            })
          })
        }
        
       })
       .catch((err)=>{
        console.log(err);
        if (err.response.data.statusCode === 406 || err.response.data.statusCode === 404 || err.response.data.statusCode === 403) {
          Modal.error({
            title: "An error has occurred",
            content:`${err.response.data.message}` ,
            okText: 'Close',              
          });  
        }
       })
        
        

     }
  return (
    <div style={{  margin: "5em auto",
    width: "75%",
    padding: "2em"}}> 
      <Container component="main" maxWidth="sm">
        <Typography component="h1" variant="h5">
        Reset password
        </Typography>
       
        <form onSubmit={handleSubmit} 
        style={{
            paddingTop : "1.5em"
        }}>
          <Grid container spacing={2}>
            
            <Grid item xs={12}>
              <TextField
                variant="standard"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlePasswordChange}
                error={Boolean(errorText.password)}
                helperText={errorText.password}
                FormHelperTextProps={{ sx: { ml: "0.1em", fontSize: "0.9rem", color: 'red' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                onChange={handleConfirmPasswordChange}
                error={Boolean(errorText.confirmPassword)}
                helperText={errorText.confirmPassword}
                FormHelperTextProps={{ sx: { ml: "0.1em", fontSize: "0.9rem", color: 'red' } }}
              />
            </Grid>
          </Grid >
          <div style={{display: "flex",flexDirection: "row-reverse",flexWrap: "nowrap", gap : "1em"}}>
          <Button
            type="submit"
            size="small"
            variant="contained"
            color="primary"
            style={{ marginTop: "16px" }}
          >
            Reset
          </Button>
          <Button
            type="submit"
            size="small"
            variant="contained"
            color="error"
            style={{ marginTop: "16px" }}
          >
            Cancel
          </Button>
          </div>
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

export default SetMK;
