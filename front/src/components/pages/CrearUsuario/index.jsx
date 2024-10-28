import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../../../config';

export const CrearUsuario = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        DNI: '',
        nombre: '',
        apellido: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.backend_url}users`, {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                DNI: formData.DNI,
                nombre: formData.nombre,
                apellido: formData.apellido
            });
            console.log(response.data.message);
            navigate('/usuario-creado');  // Redirige a la página principal
        } catch (error) {
            console.error("Error al crear usuario:", error.response ? error.response.data.message : error.message);
        }
    };
    
    return (
        <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        >
        <TextField
            required
            id="nombre"
            label="Nombre"
            value={formData.nombre}
            onChange={handleChange}
        />
        <TextField
            required
            id="apellido"
            label="Apellido"
            value={formData.apellido}
            onChange={handleChange}
        />
            <TextField
                required
                id="username"
                label="Usuario"
                value={formData.username}
                onChange={handleChange}
            />
            <TextField
                required
                id="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
            />
            <TextField
                required
                id="password"
                label="Contraseña"
                type="password"
                value={formData.password}
                onChange={handleChange}
            />
            <TextField
                id="DNI"
                label="DNI"
                type="number"
                value={formData.DNI}
                onChange={handleChange}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
            >
                Crear Usuario
            </Button>
        </Box>
    );
};
