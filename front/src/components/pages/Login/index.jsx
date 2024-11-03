import React, { useEffect, useState } from 'react';
import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import config from '../../../config.js';
import { useAuth } from "../../utils/AuthContext"

export const Login = ({ onSignIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useAuth(); // Accede a setUser desde el contexto

    useEffect(() => {
        console.log("Login component mounted");
    }, []);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await fetch(`${config.backend_url}login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to sign in');
            }

            const data = await response.json();

            if (data.user && data.user.username && data.user.role) {
                setUser(data.user); // Almacena el usuario en el contexto

                if (onSignIn) onSignIn(data);

                if (data.user.role === 'admin') {
                    navigate('/admin-panel');
                } else if (data.user.role === 'customer') {
                    navigate('/tienda');
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
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <Typography color="error">{error}</Typography>}
                <Typography component="div" variant="div">
                    No tienes un usuario? <Link href='/crear-usuario' underline='none'>Crear Usuario</Link>
                </Typography>
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
