import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import axios from 'axios';
import config from '../../../config.js';
import { useAuth } from "../../utils/AuthContext"; // Importar el contexto de autenticación

export const Product = ({ product_id, nombre, descripcion, precio, imagen_url }) => {
    const navigate = useNavigate();
    const { user } = useAuth(); // Obtener el user desde el contexto

    const handleBuyNow = () => {
        navigate(`/tienda/${product_id}`);
    };

    const handleCart = async () => {
        if (!user) {
            alert("Debes estar autenticado para agregar productos al carrito.");
            return;
        }
    
        try {
            const response = await axios.post(
                `${config.backend_url}cartItem`,
                {
                    product_id,
                    quantity: 1,
                    cart_id: user.cart_id // Usar el cart_id obtenido
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            console.log("Producto agregado al carrito:", response.data);
            alert("Producto agregado al carrito");
        } catch (error) {
            console.error(`Error al cargar en el carrito: ${error}`);
            alert("Hubo un problema al agregar el producto al carrito.");
        }
    };
    

    return (
        <Card style={{ cursor: 'pointer' }} sx={{ maxWidth: 300, height: 350, margin: 1, display: 'flex', flexDirection: 'column', justifyContent: "space-between" }}>
            <CardMedia component="img" height="140" image={imagen_url} alt={nombre} />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{nombre}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{descripcion}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" variant="outlined" onClick={handleBuyNow}>
                    Comprar $ {precio}
                </Button>
                <Button size="small" color="primary" variant="contained" onClick={handleCart}>
                    Agregar al carrito
                </Button>
            </CardActions>
        </Card>
    );
};
