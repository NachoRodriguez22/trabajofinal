import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import BackButton from '../Volver';


export const Users = ({ user_id, username, email, nombre, apellido, DNI, role }) => {
    useEffect(() => {

    }, [])

    const navigate = useNavigate();

    const handleUserClick = () => {
        navigate(`/users/${user_id}`);
    };
    return <>
        <Card onClick={handleUserClick} style={{ cursor: 'pointer' }} sx={{ maxWidth: 300, margin: 1 }}>
            <CardContent >
                <Typography gutterBottom variant="h5" component="div">
                    ID: {user_id}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    Nombre de usuario: {username}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    Email: {email}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    Nombre y apellido: {nombre} {apellido}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    DNI: {DNI}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    Rol: {role}
                </Typography>
            </CardContent>
        </Card >
    </>
}
