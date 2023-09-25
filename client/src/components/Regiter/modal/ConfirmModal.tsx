import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import React,{FC,useState} from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    open: boolean;
    onClose: () => void;
}

const ConfirmModal : React.FC<Props> = ({ open, onClose }) => {
    const navigate = useNavigate()

    const goHomePage = ()=>{
        navigate("/")
    }
    
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Registration Success"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                You have successfully registered! A confirmation email has been sent to your email address.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={goHomePage} color="primary">
                Agree and return to the homepage
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default ConfirmModal;