import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../config.js';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, CircularProgress, Input, Grid2 } from '@mui/material';
import BackButton from '../Volver/index.jsx';
import { DeletedProduct } from '../Delete/index.jsx';

export const EditProduct = () => {
    const { id } = useParams(); // Obtener el ID del producto desde la URL
    const [product, setProduct] = useState({
        product_name: '',
        descripcion: '',
        price: '',
        imagen_url: ''
    });
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null); // Estado para la imagen
    const navigate = useNavigate();

    // Cargar los datos del producto cuando se monta el componente
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${config.backend_url}products/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,  // Esto permite que las cookies de sesión se envíen
                });
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // Función para manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    // Función para manejar el cambio de archivo
    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Establecer el archivo seleccionado
    };

    // Función para guardar los cambios del producto
    const handleSave = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        try {
            // Guardar los cambios del producto
            await axios.put(`${config.backend_url}products/${id}`, product, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            // Si hay un archivo, cargarlo
            if (file) {
                const formData = new FormData();
                formData.append('file', file);

                await axios.post(`${config.backend_url}upload/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                });
            }

            navigate('/updated-product'); // Redirigir a la lista de productos después de guardar
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return <>

        <Box component="form" onSubmit={handleSave} sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Grid2>
                <Typography variant="h4" gutterBottom>
                    Edit Product
                </Typography>
                <TextField
                    fullWidth
                    label="Nombre del producto"
                    name="product_name"
                    value={product.product_name}
                    onChange={handleChange}
                    required
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Descripcion"
                    name="descripcion"
                    value={product.descripcion}
                    onChange={handleChange}
                    required
                    multiline
                    rows={4}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Precio"
                    name="price"
                    type="number"
                    value={product.price}
                    onChange={handleChange}
                    required
                    margin="normal"
                />
                <Input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    inputProps={{ style: { marginTop: 16 } }} // Puedes aplicar estilos directamente aquí
                />
            </Grid2>
            <Grid2 container sx={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Guardar
                </Button>
                <DeletedProduct />
                <BackButton />
            </Grid2>

        </Box >
    </>
};
