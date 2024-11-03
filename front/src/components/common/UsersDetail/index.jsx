import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config.js';
import { Card, CardContent, Typography, Button } from '@mui/material';
import BackButton from '../Volver/index.jsx';

export const UsersDetail = () => {
    const { id } = useParams();
    const [users, setUsers] = useState({});


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${config.backend_url}users/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,  // Esto permite que las cookies de sesión se envíen
                });
                setUsers(response.data);

            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            }
        };

        fetchUsers();


    }, [id]);

    if (!users) return <div>Loading...</div>;

    return (
        <>
            <Card sx={{ maxWidth: 800, margin: 1 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        ID: {users.user_id}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        Nombre de usuario: {users.username}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        Email: {users.email}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        Nombre y apellido: {users.nombre} {users.apellido}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        DNI: {users.DNI}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        Rol: {users.role}
                    </Typography>
                </CardContent>
            </Card >
            <BackButton />
        </>
    );
};
