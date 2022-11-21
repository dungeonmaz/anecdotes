import { Paper, Drawer, Box, Stack, Button, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { modes } from '../colorModes';

import BuildIcon from '@mui/icons-material/Build';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarIcon from '@mui/icons-material/Star';


const NewNavbar = ({ colorMode, sendLogoutRequest }) => {
    const theme = useTheme()
    const navbarButtonSx = {
        textTransform: 'none', width: '100%', transition: 'background 0.3s, color 0.3s',
        '&:hover': {
            background: theme.palette.primary.main,
            color: theme.palette.text.primary,
        },
        "& .MuiButton-startIcon": {
            position: "absolute",
            left: 20
        }, fontSize: 20
    }
    const navbarIconButtonSx = {
        transition: 'background 0.3s, color 0.3s',
        borderRadius: "0 0.5rem 0 0",
        '&:hover': {
            background: theme.palette.primary.main,
            color: theme.palette.text.primary,
        },
    }

    const navigate = useNavigate()

    const [openDrawer, setOpenDrawer] = useState(false)

    const [th, setTh] = useState(0)
    const handleTheme = (event) => {
        if (th === modes.length - 1) {
            setTh(0)
            colorMode.toggleColorMode(0)
            return
        }
        setTh(th + 1)
        colorMode.toggleColorMode(th + 1)
    }

    const handleNavigate = (path) => navigate(path)

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer)
    }

    const handleLogout = () => {
        navigate('/login')
        sendLogoutRequest()
    }

    return (
        <Paper elevation={2} sx={{
            position: 'absolute', left: 0, bottom: 0
            , backgroundColor: theme.palette.customBG.main, borderRadius: "0 0.5rem 0 0"
        }}>
            <IconButton sx={navbarIconButtonSx} onClick={toggleDrawer} size="large" variant="text" color="primary"><MenuIcon /></IconButton>

            <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
                <Box sx={{ width: 300, backgroundColor: theme.palette.customBG.main, height: "100%" }} onClick={toggleDrawer} onKeyDown={toggleDrawer}>
                    <Stack direction="column" spacing={1} alignItems="center" p={1}>
                        <Button onClick={() => handleNavigate('/')} size="large" variant="text" color="primary" startIcon={<VisibilityIcon />} sx={navbarButtonSx}>
                            Anecdotes
                        </Button>
                        <Button onClick={() => handleNavigate('/add_anecdote')} size="large" variant="text" color="primary" startIcon={<AddIcon />} sx={navbarButtonSx}>
                            Add Anectode
                        </Button>
                        <Button onClick={() => handleNavigate('/best_anecdotes')} size="large" variant="text" color="primary" startIcon={<StarIcon />} sx={navbarButtonSx}>
                            Best Anecdotes
                        </Button>
                        <Button onClick={handleTheme} size="large" variant="text" color="primary" startIcon={<BuildIcon />} sx={navbarButtonSx}>
                            Change Theme
                        </Button>
                        <Button onClick={handleLogout} size="large" variant="text" color="primary" startIcon={<BuildIcon />} sx={navbarButtonSx}>
                            Logout
                        </Button>
                    </Stack>
                </Box>
            </Drawer>
        </Paper>
    )
}

export default NewNavbar