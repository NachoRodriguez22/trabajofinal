import React, { useState } from 'react';
import axios from 'axios';
import config from '../../../config';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import BackButton from '../Volver';

export const ImgUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setMessage('Por favor, selecciona un archivo');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${config.backend_url}upload/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
            setMessage('Archivo subido exitosamente');
            setFile(null);

            // Redirigir a la página deseada tras la subida exitosa
            navigate('/products');
        } catch (error) {
            console.error('Error al subir el archivo', error);
            setMessage('Error al subir el archivo');
        }
    };

    return <>
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                mt: 4,
            }}
        >
            <Typography variant="h5" component="h2" gutterBottom>
                Subir Archivo
            </Typography>
            <Button
                variant="contained"
                component="label"
            >
                Seleccionar Archivo
                <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                />
            </Button>
            {file && <Typography variant="body2">Archivo seleccionado: {file.name}</Typography>}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
            >
                Subir
            </Button>
            {message && <Typography variant="body2" color="textSecondary">{message}</Typography>}
        </Box>
        <BackButton />
    </>
};
