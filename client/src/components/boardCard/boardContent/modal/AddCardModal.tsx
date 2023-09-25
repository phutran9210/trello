// AddCardModal.tsx

import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


interface AddCardModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (formData: { title: string; description: string }) => void;
}

const AddCardModal: React.FC<AddCardModalProps> = ({ open, onClose, onSubmit }) => {

    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    

    const handleSubmit = () => {
        onSubmit(formData);
        setFormData({
            title: '',
            description: ''
        })
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="add-new-card-title"
            aria-describedby="add-new-card-description"
        >
            <DialogTitle id="add-new-card-title">Add New Card</DialogTitle>
            <DialogContent>
                <DialogContentText id="add-new-card-description">
                    Please enter the details for the new card.
                </DialogContentText>
                <TextField
                    autoFocus
                    value={formData.title}
                    name='title'
                    margin="dense"
                    id="cardTitle"
                    label="Card Title"
                    onChange={handleInputChange}
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                   name = "description"
                    margin="dense"
                    id="cardDescription"
                    label="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddCardModal;
