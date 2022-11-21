import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { Stack } from '@mui/system';
import React from 'react'

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Keyboard = ({ likePerson, dislikePerson, rating }) => {
  const theme = useTheme()
  const iconButtonSx = {
    transition: 'color 0.3s, transform 0.3s',
    borderRadius: "0.5rem",
    fontSize: '32px',
    width: '36px',
    '&:hover': {
      transform: 'scale(1.3)',
      background: 'none',
      color: theme.palette.text.primary,
    },
  }

  return (
    <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'center', }}>
      <Stack direction="row" display="flex" spacing={1} justifyContent="center" alignItems="center">
        <IconButton onClick={dislikePerson} sx={iconButtonSx} color="primary" size="large">
          <ThumbDownIcon fontSize='32px' />
        </IconButton>
        <Typography variant="h5" width={150} textAlign="center">{rating}</Typography>
        <IconButton onClick={likePerson} sx={iconButtonSx} color="primary" size="large">
          <ThumbUpIcon fontSize='32px' />
        </IconButton>
      </Stack>
    </Box>
  )
}

export default Keyboard