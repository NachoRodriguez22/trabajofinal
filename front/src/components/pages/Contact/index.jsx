import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';

export const Contact = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Contáctanos
            </Typography>
            <Typography variant="body1" gutterBottom>
                Si tienes alguna pregunta, no dudes en contactarnos a través de nuestras redes sociales.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                <Button
                    variant="contained"
                    color="success"
                    href="https://wa.me/542323616224" // Reemplaza con tu número de WhatsApp
                    target="_blank"
                    startIcon={<FontAwesomeIcon icon={faWhatsapp} />}
                >
                    WhatsApp
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    href="https://www.instagram.com/ignaciorodriguezamoblamientos" // Reemplaza con tu perfil de Instagram
                    target="_blank"
                    startIcon={<FontAwesomeIcon icon={faInstagram} />}
                >
                    Instagram
                </Button>
            </Box>
        </Box>
    );
};

