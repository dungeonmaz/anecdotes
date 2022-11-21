import { withTheme } from '@emotion/react'
import { Button, Card, TextField } from '@mui/material'
import axios from 'axios'
import React, { Component } from 'react'

import AddIcon from '@mui/icons-material/Add';
import { API_URL } from '../index';

export class AddAnecdotePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: '',
        }

        this.buttonSx = {
            textTransform: 'none', width: '100%', transition: 'background 0.3s, color 0.3s', borderRadius: 0,
            '&:hover': {
                background: props.theme.palette.primary.main,
                color: props.theme.palette.text.primary,
            },
            "& .MuiButton-startIcon": {
                position: "absolute",
                left: 20
            }, fontSize: 20
        }
    }

    addAnecdote() {
        if (this.props.user){
        axios.post(API_URL + 'anecdotes/add', {
            username: this.props.user.username,
            text: this.state.text,
            rating: 0,
        })} else {
            alert("You are not registered")
            return
        }
    }

    handleChange(event) {
        this.setState({text: event.target.value})
    }

    render() {
        return (
            <div style={{ position: 'absolute', transform: "translate(-50%)", left: "50%" }}>
            <Card sx={{ width: "340px", backgroundColor: this.props.theme.palette.customBG.main, borderRadius: "0.5rem" }} elevation={1}>
                <TextField  inputProps={{style: {fontSize: 20}}}
                InputLabelProps={{style: {fontSize: 20}}}
                placeholder='Anecdote' variant="standard" fullWidth sx={{p: 1, height: 400, overflow: 'auto', '&::-webkit-scrollbar': {display:"none"}}} multiline value={this.state.text} onChange={this.handleChange.bind(this)}/>
                <Button startIcon={<AddIcon />} onClick={this.addAnecdote.bind(this)} sx={this.buttonSx}>Add</Button>
            </Card>
            </div>
        )
    }
}

export default withTheme(AddAnecdotePage)