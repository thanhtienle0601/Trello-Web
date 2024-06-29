import { Box, Button } from '@mui/material'
import Column from './Column/Column'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

function ListColumns({ columns }) {
  return (
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
        <Column key={column._id} column={column} />
      ))}

      {/*Box add new column */}
      <Box
        sx={{
          minWidth: '200px',
          maxWidth: '200px',
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
    </Box>
  )
}

export default ListColumns
