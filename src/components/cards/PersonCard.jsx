import { Card, CardContent, Divider, Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '@emotion/react';

import Keyboard from './Keyboard';

const PersonCard = ({ data, likePerson, dislikePerson }) => {
    const theme = useTheme()

    return (
        <div style={{ position: 'absolute', transform: "translate(-50%)", left: "50%" }}>
            <Card sx={{ width: "340px", backgroundColor: theme.palette.customBG.main, borderRadius: "0.5rem" }} elevation={1}>
                <Typography textAlign="center">Author : {data.username}</Typography>
                <CardContent sx={{ p: 1, }}>
                    <Typography sx={{
                        fontSize: '20px', lineHeight: "25px", whiteSpace: 'pre-line',
                        height: 400, overflow: 'auto', '&::-webkit-scrollbar': { display: "none" }
                    }}>
                        {data.text}
                    </Typography>
                </CardContent>
                <Divider sx={{ borderBottomWidth: 2, borderColor: theme.palette.secondary.main, margin: "0.5rem 0" }} />
                <Keyboard likePerson={likePerson} dislikePerson={dislikePerson} rating={data.rating} />
            </Card>
        </div >
    )
}

export default PersonCard

