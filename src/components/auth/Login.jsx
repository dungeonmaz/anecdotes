import { Button, Card, TextField, Typography, useTheme } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'

import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios';
import { API_URL } from '../../index';
import { useNavigate } from 'react-router-dom';

const Login = ({ user }) => {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
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
        await axios.post(API_URL + "users/login", {
            email: inputs.email,
            password: inputs.password
        }).catch(err => console.log(err))
    }

    const handleSubmit = () => {
        sendRequest()
        navigate("/")
    }

    return (
        <Card elevation={3} sx={{ width: 340, m: '5vh auto', borderRadius: '0.5rem', backgroundColor: theme.palette.customBG.main, }}>
            <Stack spacing={2} p={2}>
                <Typography variant="h4" textAlign="center">Login</Typography>
                <TextField onChange={handleChange} name="email" value={inputs.email} type="email" margin='normal' fullWidth label="Email" />
                <TextField onChange={handleChange} name="password" value={inputs.password} type="password" margin='normal' fullWidth label="Password" />
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center">
                <Typography color="text.secondary" variant="body1">Don't have account?</Typography>
                <Button onClick={() => navigate('/signup')} sx={{ textTransform: 'none', }}>Signup</Button>
            </Stack>
            {user && <Typography color="text.secondary" variant="body1" textAlign="center">Already login</Typography>}
            <Button disabled={user} onClick={handleSubmit} sx={buttonSx} endIcon={<LoginIcon />}>Login</Button>
        </Card>
    )
}

export default Login