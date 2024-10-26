import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import config from '../../../config.js';

export const Login = ({ onSignIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Login component mounted");
    }, []);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError(null); // Reset error on each attempt
        try {
            const response = await fetch(`${config.backend_url}login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to sign in');
            }

            const data = await response.json();

            // Verifica si `data.user` existe y tiene rol
            if (data.user && data.user.username && data.user.role) {
                
                // Llama a la función de callback si existe
                if (onSignIn) {
                    onSignIn(data);
                }

                // Redirige según el rol del usuario
                if (data.user.role === 'admin') {
                    navigate('/admin'); // Página de administración
                } else if (data.user.role === 'customer') {
                    navigate('/tienda'); // Página de tienda
                }
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <Typography component="h1" variant="h5">
                Iniciar Sesión
            </Typography>
            <Box component="form" onSubmit={handleSignIn} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Nombre de Usuario"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Iniciar Sesión
                </Button>
            </Box>
        </>
    );
};
