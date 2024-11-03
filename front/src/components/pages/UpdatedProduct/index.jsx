import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const UpdatedProduct = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/mod-products');
        }, 1000);

        return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }, [navigate]);

    return (
        <>
            <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                Producto modificado correctamente.
            </Typography>
            <Typography variant="subtitle1" align="center" sx={{ mt: 2, fontStyle: 'italic' }}>
                Redirigiendo...
            </Typography>
        </>
    );
};
