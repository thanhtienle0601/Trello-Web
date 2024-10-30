import { Box, CircularProgress, Typography } from '@mui/material'

const LoadingSpinner = ({ caption }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        gap: 2,
        height: '100vh'
      }}
    >
      <CircularProgress />
      <Typography>{caption}...</Typography>
    </Box>
  )
}

export default LoadingSpinner
