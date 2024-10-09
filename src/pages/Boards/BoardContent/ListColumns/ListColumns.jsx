import { Box, Button } from '@mui/material'
import Column from './Column/Column'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'
import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import { useState } from 'react'
import theme from '~/theme'
import { toast } from 'react-toastify'

function ListColumns({ columns, createNewColumn, createNewCard }) {
  const [openAddNewColumnForm, setOpenAddNewColumnForm] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const toggleOpenAddNewColumnForm = () =>
    setOpenAddNewColumnForm(!openAddNewColumnForm)

  const addNewColumn = async () => {
    if (!newColumnTitle)
      return toast.error('Please enter column title !', {
        position: 'bottom-right'
      })

    const columnData = {
      title: newColumnTitle
    }

    await createNewColumn(columnData)

    toggleOpenAddNewColumnForm()
    setNewColumnTitle('')
  }

  return (
    <SortableContext
      items={columns?.map((c) => c._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          backgroundColor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': {
            m: 2
          }
        }}
      >
        {columns.map((column) => (
          <Column
            key={column._id}
            column={column}
            createNewCard={createNewCard}
          />
        ))}

        {/*Box add new column */}
        {!openAddNewColumnForm ? (
          <Box
            onClick={toggleOpenAddNewColumnForm}
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              borderRadius: '6px',
              mx: 2,
              bgcolor: '#ffffff3d',
              height: 'fit-content'
            }}
          >
            <Button
              startIcon={<NoteAddIcon />}
              sx={{
                color: 'white',
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2.5,
                py: 1
              }}
            >
              Add new column
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              mx: 2,
              p: 1,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: '#ffffff3d',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <TextField
              type="text"
              label="Enter column title..."
              variant="outlined"
              size="small"
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                minWidth: 120,
                maxWidth: 180,
                '& label': { color: 'white' },
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white'
                  },
                  '&:hover fieldset': {
                    borderColor: 'white'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white'
                  }
                }
              }}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Button
                onClick={addNewColumn}
                variant="contained"
                color="success"
                size="small"
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                }}
              >
                Add Column
              </Button>
              <CloseIcon
                fontSize="small"
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': { color: (theme) => theme.palette.warning.main }
                }}
                onClick={toggleOpenAddNewColumnForm}
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  )
}

export default ListColumns
