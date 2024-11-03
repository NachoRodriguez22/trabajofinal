import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config.js'; // Asegúrate de que la URL base esté configurada correctamente

export const DeletedProduct = () => {
    const { id } = useParams(); // Obtener el ID del producto desde la URL
    const navigate = useNavigate();
    const [open, setOpen] = useState(false); // Para controlar el diálogo de confirmación

    // Función para eliminar el producto
    const handleDelete = async () => {
        try {
            await axios.delete(`${config.backend_url}products/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,  // Asegúrate de enviar las cookies de sesión si es necesario
            });
            navigate('/mod-products'); // Redirige a la lista de productos después de eliminar
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Manejar la apertura del diálogo de confirmación
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Manejar el cierre del diálogo
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="contained"
                sx={{ mt: 2 }}
                onClick={handleClickOpen}>
                Eliminar producto
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Eliminar Producto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={() => { handleDelete(); handleClose(); }} color="secondary">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
