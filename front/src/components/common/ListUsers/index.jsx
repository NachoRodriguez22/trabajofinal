import React, { useEffect, useState } from 'react'
import axios from "axios";
import config from '../../../config.js'
import { Grid2 } from '@mui/material';
import { Users } from '../Users/index.jsx';
import BackButton from '../Volver/index.jsx';

export const ListUsers = () => {
    const [users, setUsers] = useState([
    ])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${config.backend_url}users`, {
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
    }, []);


    return (
        <>
            <Grid2 container sx={{ display: "flex", justifyContent: "space-evenly" }}>
                {users.map((users) => (
                    <Users
                        key={users.user_id}
                        user_id={users.user_id}
                        username={users.username}
                        email={users.email}
                        nombre={users.nombre}
                        apellido={users.apellido}
                        DNI={users.DNI}
                        role={users.role}
                    />
                ))
                }
            </Grid2>

            <BackButton />
        </>
    )
}
