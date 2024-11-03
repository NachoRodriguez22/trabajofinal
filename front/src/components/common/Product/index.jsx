import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import axios from 'axios';
import config from '../../../config.js';
import { useAuth } from "../../utils/AuthContext"

// Recibe el user_id como una prop adicional
export const Product = ({ product_id, nombre, descripcion, precio, imagen_url, user_id }) => {
    const navigate = useNavigate();

    const handleBuyNow = () => {
        navigate(`/tienda/${product_id}`);
    };

    const handleAddToCart = async () => {
        try {
            const { user } = useAuth();
            if (!user || !user.user_id) {
                alert("Debes iniciar sesión para agregar productos al carrito.");
                return;
            }

            const cartResponse = await axios.get(`${config.backend_url}cart/active`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            let cart_id;
            if (cartResponse.data && cartResponse.data.cart_id) {
                cart_id = cartResponse.data.cart_id;
            } else {
                const newCartResponse = await axios.post(`${config.backend_url}cart`,
                    { user_id: user.user_id },
                    { headers: { "Content-Type": "application/json" }, withCredentials: true }
                );
                cart_id = newCartResponse.data.cart_id;
            }

            await axios.post(
                `${config.backend_url}cartItem`,
                {
                    cart_id,
                    product_id,
                    quantity: 1
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            alert("Producto agregado al carrito");
        } catch (error) {
            console.error("Error al agregar producto al carrito", error);
            if (error.response) {
                // La solicitud se realizó y el servidor respondió con un código de estado
                alert("Error al agregar al carrito: " + error.response.data.message);
            } else if (error.request) {
                // La solicitud se realizó pero no se recibió respuesta
                alert("Error de red al agregar al carrito. Por favor, inténtalo de nuevo.");
            } else {
                // Ocurrió un error al configurar la solicitud
                alert("Error: " + error.message);
            }
        }
    }



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
                <Button size="small" color="primary" variant="contained" onClick={handleAddToCart}>
                    Agregar al carrito
                </Button>
            </CardActions>
        </Card>
    );
};
