import Column from './column/Column'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import React,{FC,useState,useEffect} from 'react'
import {permissionWriteStatus,loggedUserSelector,boardDataSelector} from "../../../redux/selectors/selector"
import {useDispatch,useSelector} from "react-redux"
import {PayloadCreateClumn} from "../../../interfaces/board"
import {Modal} from "antd"
import AddColumnModal from './modal/AddColumnModal'
import {createColumnRequest} from "../../../redux/slices/createColumn"

interface ColumnData {
    column_id: string;
    board_id : string
}

interface ListColumnsProps {
    columns: ColumnData[];
    board_id : string

}

const ListColumns: FC<ListColumnsProps> = ({ columns }) => {
    console.log(columns);

    const [openModal, setOpenModal] = useState(false);
    const permission = useSelector(permissionWriteStatus)

    const dispatch = useDispatch()
    const boardData = useSelector(boardDataSelector)
    const loggedUser = useSelector(loggedUserSelector)

    

    const handleSubmitNewCard = (formData: {title: string}) => {
        
        const payload = {
            title : formData.title,
            board_id : boardData.board.board_id,
            owner_column : loggedUser.user_id
        }
        dispatch(createColumnRequest(payload))
        
        handleCloseModal();
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleOpenModal = () => {
        setOpenModal(true);
    };
    
    const addNewColumn = ()=>{
        if (permission === false) {
          return  Modal.error({
                title: 'ERROR',
                content: " Permission error ",
                okText: 'Close', 
              });  
        }
        handleOpenModal()
 
    }
    
    const arrayColumnIds = columns?.map(c => c.column_id);
    return (
        // {columns} must be array [1,2,3]
        <SortableContext items={arrayColumnIds} strategy={horizontalListSortingStrategy}>
            <Box sx={{
                bgcolor: 'inherit',
                width: '100%',
                height: '100%',
                display: 'flex',
                overflowX: 'auto',
                overflowY: 'hidden'
            }
            }>
                {/* List columns */}
                {columns && columns.map(column => <Column key={column.column_id} column={column} />)}

                {/* Add Column */}
                <Box sx={{
                    minWidth: '200px',
                    maxWidth: '200px',
                    height: 'fit-content',
                    bgcolor: '#ffffff3d',
                    borderRadius: '6px',
                    mx: 2
                }}>
                    <Button
                     sx={{
                        width: '100%',
                        color: 'white',
                        justifyContent: 'flex-start',
                        pl: 2.5,
                        py: 1
                    }}
                    onClick={addNewColumn}
                    // disabled = {true}
                        startIcon={<NoteAddIcon />}>Add new column</Button>
                </Box>
            </Box>
            <AddColumnModal
             open={openModal}
             onClose={handleCloseModal}
             onSubmit={handleSubmitNewCard}
            />
        </SortableContext>
    )
}

export default ListColumns