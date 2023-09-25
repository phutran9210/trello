import React, { useState,useEffect } from "react";
import Button from '@mui/material/Button'
import  TextField  from "@mui/material/TextField";
import  Grid  from "@mui/material/Grid";
import  Typography  from "@mui/material/Typography";
import  Container  from "@mui/material/Container";
import  Alert  from "@mui/material/Alert";
import  Snackbar  from "@mui/material/Snackbar";
import { Paper } from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import {PayloadCreateUser} from "../interfaces/reduxActions"
import {registerUserRequest} from "../redux/slices/createUser"
import {completedRegisterStatus} from "../redux/selectors/selector"


import ConfirmModal from "./modal/ConfirmModal";

interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

 
  
  const usernamePattern = /^[a-z0-9]{8,32}$/
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordPattern = /^[a-zA-Z0-9!@#$%^&*]{8,32}$/;



  const RegisterComponent: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [errorText, setErrorText] = useState({
        username: "",
        email: "",
        password : "",
        confirmPassword: ""
      });
      const [openDialog, setOpenDialog] = useState(false);
      const dispatch = useDispatch()
      const completeCode = useSelector(completedRegisterStatus)
 
      useEffect(()=>{
        if (completeCode !== 200) {
          return
        }
        setOpenDialog(true)
      },[completeCode])
  
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (value && !passwordPattern.test(value)) {
            setErrorText(prev => ({ ...prev, password: "The password can be in regular letters or numbers or include the following special characters: !@#$%^&*." }));
          } else {
            setErrorText(prev => ({ ...prev, password: "" }));
          }
      };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (value && !usernamePattern.test(value)) {
            setErrorText(prev => ({ ...prev, username: "Username must be lowercase and numbers, 8-32 characters long ." }));
          } else {
            setErrorText(prev => ({ ...prev, username: "" }));
          }
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
      const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    
        if (value !== formData.password) {
            setErrorText(prev => ({ ...prev, confirmPassword: "Passwords do not match." }));
        } else {
            setErrorText(prev => ({ ...prev, confirmPassword: "" }));
        }
    };

  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
     

        if (!usernamePattern.test(formData.username)) {
            setSnackbarMessage("Invalid Username format!");
            setOpenSnackbar(true);
            return;
        }

        if (!emailPattern.test(formData.email)) {
            setSnackbarMessage("Invalid email format!");
            setOpenSnackbar(true);
            return;
        }

        if (!passwordPattern.test(formData.password)) {
            setSnackbarMessage("Invalid password format!");
            setOpenSnackbar(true);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setSnackbarMessage("Passwords do not match!");
            setOpenSnackbar(true);
            return;
        }
  
      const payloadRegister : PayloadCreateUser = {
        username : formData.username,
        email : formData.email,
        password : formData.password
      }
      dispatch(registerUserRequest(payloadRegister))
  
      console.log("Registered:", formData);
    };


  
    return (
      <div style={{  margin: "5em auto",
        width: "75%",
        padding: "2em"}}>
        
      <Container component="main" maxWidth="sm">
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
       
        <form onSubmit={handleSubmit} 
        style={{
            paddingTop : "1.5em"
        }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                variant="standard"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                onChange={handleUsernameChange}
                error={Boolean(errorText.username)}
                 helperText={errorText.username}
                 FormHelperTextProps={{ sx: { ml : "0.1em", fontSize : "0.9rem", color: 'red' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleEmailChange}
                error={Boolean(errorText.email)}
                 helperText={errorText.email}
                 FormHelperTextProps={{ sx: { ml : "0.1em", fontSize : "0.9rem", color: 'red' } }}
              />
            </Grid>
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
            Sign Up
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
      <ConfirmModal
      open={openDialog} onClose={() => setOpenDialog(false)} 
      />
      </Container>
      </div>
    );
  };
  
  export default RegisterComponent;