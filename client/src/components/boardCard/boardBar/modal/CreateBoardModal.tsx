import React, { useState,useRef, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select,{SelectChangeEvent} from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Stack from "@mui/material/Stack"
import Autocomplete from '@mui/material/Autocomplete';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/lab/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {FormHelperText} from "@mui/material"
import {createPermissionRequest,setDefaultPermisionBoardRequest} from "../../../redux/slices/createNewChat"
import {createBoardRequest} from "../../../redux/slices/createBoard"
import {useDispatch,useSelector} from "react-redux"
import {permissionSelector} from "../../../redux/selectors/selector"
import axios from 'axios';
import {notification} from "antd"
import { findDuplicates } from "../../../../helper/config"

const ENDPOINT = "http://localhost:3000";

interface CreateBoardModalProps {
    open: boolean;
    onClose: () => void;
  }


const CreateBoardModal: React.FC<CreateBoardModalProps> = ({ open, onClose }) => {
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const loggedIdRef =useRef()
  const [writeMemberIds, setWriteMemberIds] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [memberIds, setMemberIds] = useState([]);
    const [inputSearch,setInputSearch] = useState("")
    const [age, setAge] = React.useState('');
   const dispatch = useDispatch()
   const result = useSelector(permissionSelector)
   const [validationErrors, setValidationErrors] = useState({
    title: false,
    description: false,
    type: false
  });
  

   useEffect(()=>{
    const fetchTokenAndInitializeSocket = async () => {
      try {
        const response = await axios.post(
          `${ENDPOINT}/user/get-token`,
          {},
          { withCredentials: true }
        )
        loggedIdRef.current = response.data.userId
        
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchTokenAndInitializeSocket()
  },[])


  
    const gatherAllData = () => {
      return {
        title: title,
        description: description,
        type: age,
        memberIds: memberIds,
        canWriteMemberId: writeMemberIds,
        ownerId : loggedIdRef.current
      };
    };

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
    if (event.target.value) {
      setValidationErrors(prevErrors => ({ ...prevErrors, type: false }));
    }
  };

    const handleCreateBoard = () => {
      let errors = {
        title: !title,
        description: !description,
        type: !age
      };
    
      setValidationErrors(errors);
    
      if (!errors.title && !errors.description && !errors.type) {
        const allData = gatherAllData();
        console.log(allData);
        dispatch(createBoardRequest(allData));
        onClose();
      } else {
      
        setSnackbarMessage("Please do not leave the required fields blank.");
        setOpenSnackbar(true);
        return
      }

      const allData = gatherAllData();
      console.log(allData);
      
      dispatch(createBoardRequest(allData))
        onClose();
    };

 
    const handleAutocompleteChange = (event: any, newValue: any) => {
      const selectedUserIds = newValue.map(user => user.user_id);
       const updatedWriteMemberIds = writeMemberIds.filter(id => !selectedUserIds.includes(id));
      setWriteMemberIds(updatedWriteMemberIds);
      
      if (writeMemberIds.length !== updatedWriteMemberIds.length) {
        setSnackbarMessage(`Some users were removed from 'Member can write' list as they were added to 'Member only real' list.`);
        setOpenSnackbar(true);
      }

      const checkid = findDuplicates(selectedUserIds)
      const uniqueCheckId = [...new Set([...checkid])]
      console.log(uniqueCheckId);
      

      if (uniqueCheckId.length > 0) {
        setButtonDisabled(true);
        const duplicateUsers = newValue.filter(user => uniqueCheckId.includes(user.user_id));

        const uniqueDuplicateUsers = Array.from(duplicateUsers.reduce((acc, current) => {
          if (!acc.has(current.user_id)) acc.set(current.user_id, current);
          return acc;
        }, new Map()).values());

        const duplicateUsernames = uniqueDuplicateUsers.map(user => user.username).join(', ');

        setSnackbarMessage(`User duplicate in Member only real : ${duplicateUsernames}`);
        setOpenSnackbar(true);
      }else{
        setButtonDisabled(false);
      }
      
      const uniqueUserIds = [...new Set([...memberIds, ...selectedUserIds])];
      console.log(uniqueUserIds);
      
      setMemberIds(selectedUserIds);
      dispatch(setDefaultPermisionBoardRequest())

  };
  const handleAutocompleteInputChange = (event: any, newInputValue: string) => {
    setInputSearch(newInputValue)
};
const handleWriteAutocompleteChange = (event: any, newValue: any) => {
  const selectedUserIds = newValue.map(user => user.user_id);
  const updatedMemberIds = memberIds.filter(id => !selectedUserIds.includes(id));
  setMemberIds(updatedMemberIds);

  if (memberIds.length !== updatedMemberIds.length) {
    setSnackbarMessage(`Some users were removed from 'Member only real' list as they were added to 'Member can write' list.`);
    setOpenSnackbar(true);
  }
      
      const checkid = findDuplicates(selectedUserIds)
      const uniqueCheckId = [...new Set([...checkid])]
      console.log(uniqueCheckId);
      

      if (uniqueCheckId.length > 0) {
        setButtonDisabled(true);
        const duplicateUsers = newValue.filter(user => uniqueCheckId.includes(user.user_id));

        const uniqueDuplicateUsers = Array.from(duplicateUsers.reduce((acc, current) => {
          if (!acc.has(current.user_id)) acc.set(current.user_id, current);
          return acc;
        }, new Map()).values());

        const duplicateUsernames = uniqueDuplicateUsers.map(user => user.username).join(', ');

        setSnackbarMessage(`User duplicate in Member can write : ${duplicateUsernames}`);
       setOpenSnackbar(true);
      }else{
        setButtonDisabled(false);
      }
      
      const uniqueUserIds = [...new Set([...memberIds, ...selectedUserIds])];
      console.log(uniqueUserIds);
      
      setWriteMemberIds(selectedUserIds);

      dispatch(setDefaultPermisionBoardRequest())


};

    const handleSearch = () => {
      const payload = {
        data : inputSearch
      }
      dispatch(createPermissionRequest(payload))
  };

  // Handle onKeyDown for the Autocomplete
  const handleAutocompleteKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
          handleSearch();
      }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  
    if (e.target.value) {
      setValidationErrors(prevErrors => ({ ...prevErrors, title: false }));
  
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    if (e.target.value) {
      setValidationErrors(prevErrors => ({ ...prevErrors, description: false }));
    }
  };


  return (
    <div>
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Create a new board</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
                value={title} 
                onChange={handleTitleChange}
                error={validationErrors.title}
                helperText={validationErrors.title ? "The title must not be left blank." : ""}
            />
            <TextField
                margin="dense"
                id="description"
                label="Description"
                type="text"
                fullWidth
                variant="standard"
                value={description} 
                onChange={handleDescriptionChange}
                error={validationErrors.description}
                helperText={validationErrors.description ? "The description must not be left blank." : ""}
            />

             <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
             <InputLabel id="demo-select-small-label">Visibility</InputLabel>  
             <Select
             labelId="demo-select-small-label"
             id="demo-select-small"
              
              label="Visibility"
               onChange={handleChange}
             >
              <MenuItem value="public">Public</MenuItem>
               <MenuItem value="private">Private</MenuItem>
              
        </Select>
        {validationErrors.type && <FormHelperText style={{color : "red"}}>The visibility must not be left blank.</FormHelperText>}
      </FormControl>

        <Stack spacing={3} sx={{ width: 550 }}>
        <Autocomplete
        multiple
        id="tags-outlined"
        options={result}
        getOptionLabel={(option) => option?.username}
        defaultValue={[]}
        onKeyDown={handleAutocompleteKeyDown} 
        onChange={handleAutocompleteChange}
        onInputChange={handleAutocompleteInputChange}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Member only real"
            placeholder="Favorites"
            variant="standard"
          />
        )}
      />
      </Stack>

      <Stack spacing={3} sx={{ width: 550 }}>
        <Autocomplete
        multiple
        id="tags-outlined"
        options={result}
        getOptionLabel={(option) => option?.username}
        defaultValue={[]}
        onKeyDown={handleAutocompleteKeyDown} 
        onChange={handleWriteAutocompleteChange}
        onInputChange={handleAutocompleteInputChange}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Member can write"
            placeholder="Favorites"
            variant="standard"
          />
        )}
      />
      </Stack>

        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button disabled={isButtonDisabled} onClick={handleCreateBoard}>Create</Button>
        </DialogActions>
    </Dialog>

<Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
    <Alert onClose={() => setOpenSnackbar(false)} severity="error" variant="filled" >
    <AlertTitle>Error</AlertTitle>
        {snackbarMessage}
    </Alert>
</Snackbar>
</div>
  );
};

export default CreateBoardModal;
