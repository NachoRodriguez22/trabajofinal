import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const UsuarioCreado = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000);

        return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }, [navigate]);

    return (
        <>
            <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                Usuario creado con éxito
            </Typography>
            <Typography variant="subtitle1" align="center" sx={{ mt: 2, fontStyle: 'italic' }}>
                Redirigiendo...
            </Typography>
        </>
    );
};
