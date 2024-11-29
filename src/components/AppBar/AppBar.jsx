import ModeSelect from '~/components/ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import Typography from '@mui/material/Typography'
import { Box, Button, SvgIcon } from '@mui/material'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Profiles from './Menus/Profiles'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Notifications from './Notifications/Notifications'
import AutoCompleteSearchBoard from './SearchBoards/AutoCompleteSearchBoard'

function AppBar() {
  const [searchValue, setSearchValue] = useState('')
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto',
        '&::-webkit-scrollbar-track': {
          m: 2
        },
        paddingX: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? '#1565c0' : '#2c3e50'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title="Board list">
          <Link to={'/boards'}>
            <AppsIcon sx={{ color: 'white', verticalAlign: 'middle' }} />
          </Link>
        </Tooltip>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link to={'/'}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
              <SvgIcon
                component={TrelloIcon}
                inheritViewBox
                fontSize="small"
                sx={{ color: 'white' }}
              />
              <Typography
                sx={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: 'white'
                }}
              >
                Trello
              </Typography>
            </Box>
          </Link>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Workspaces />
            <Recent />
            <Starred />
            <Templates />
          </Box>

          <Button
            sx={{
              color: 'white',
              border: 'none',
              '&:hover': {
                border: 'none'
              }
            }}
            variant="outlined"
            startIcon={<LibraryAddIcon />}
          >
            Create
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Quick search board */}
        <AutoCompleteSearchBoard />
        <ModeSelect />
        {/* <Tooltip title="Notifications">
          <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'white' }} />
          </Badge>
        </Tooltip> */}
        <Notifications />
        <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white' }} />
        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar
