import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const LogoutConfirmation = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/'); // Redirige al inicio después de 3 segundos
        }, 3000);

        return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }, [navigate]);

    return (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            Has cerrado sesión correctamente. Redirigiendo al inicio...
        </Typography>
    );
};
