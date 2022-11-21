import { Button, Card, TextField, Typography, useTheme } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'

import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios';
import { API_URL } from '../../index';
import { useNavigate } from 'react-router-dom';

const Signup = ({user}) => {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: ''
    })
    const theme = useTheme()

    const buttonSx = {
        textTransform: 'none', width: '100%', transition: 'background 0.3s, color 0.3s', borderRadius: 0,
        '&:hover': {
            background: theme.palette.primary.main,
            color: theme.palette.text.primary,
        }, fontSize: 20
    }

    const handleChange = (e) => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            [e.target.name]: e.target.value
        }))
    }

    const sendRequest = async () => {
        await axios.post(API_URL + "users/signup", {
            username: inputs.username,
            email: inputs.email,
            password: inputs.password
        }).catch(err => console.log(err))
    }

    const handleSubmit = () => {
        sendRequest().then(() => navigate("/login"))
    }

    return (
        <Card elevation={3} sx={{ width: 340, m: '5vh auto', borderRadius: '0.5rem', backgroundColor: theme.palette.customBG.main, }}>
            <Stack spacing={2} p={2}>
                <Typography variant="h4" textAlign="center">Signup</Typography>
                <TextField onChange={handleChange} name="email" value={inputs.email} type="email" margin='normal' fullWidth label="Email" />
                <TextField onChange={handleChange} name="username" value={inputs.username} type="username" margin='normal' fullWidth label="Username" />
                <TextField onChange={handleChange} name="password" value={inputs.password} type="password" margin='normal' fullWidth label="Password" />
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center">
                <Typography color="text.secondary" variant="body1">Already have account?</Typography>
                <Button onClick={() => navigate('/login')} sx={{ textTransform: 'none', }}>Login</Button>
            </Stack>
            {user && <Typography color="text.secondary" variant="body1" textAlign="center">Already login</Typography>}
            <Button disabled={user} onClick={handleSubmit} sx={buttonSx} endIcon={<LoginIcon />}>Signup</Button>
        </Card>
    )
}

export default Signup