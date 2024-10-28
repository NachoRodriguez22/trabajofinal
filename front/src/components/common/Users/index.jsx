import React, { useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export const Users = ({ user_id, username, email, nombre, apellido, dni }) => {
    useEffect(() => {

    }, [])

    return (
        <>
            <Card sx={{ maxWidth: 300, margin: 1 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {user_id}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {username}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {email}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {nombre}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {apellido}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {dni}
                    </Typography>
                </CardContent>
            </Card >
        </>
    )
}
