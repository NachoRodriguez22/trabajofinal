import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config.js';
import { Card, CardContent, CardMedia, Typography, Button, CardActionArea, CardActions } from '@mui/material';
import BackButton from '../Volver/index.jsx';

export const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${config.backend_url}products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <>
            <Card sx={{ maxWidth: 700, margin: 1 }}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">{product.product_name}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{product.descripcion}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardMedia
                    component="img"
                    image={`${config.backend_url}images/${product.imagen_url}`}
                    alt={product.product_name}
                />
                <CardActions>
                    <Button size="small" color="primary" variant="outlined">Comprar ${product.price}</Button>
                    <Button size="small" color="primary" variant='contained'>Agregar al carrito</Button>
                </CardActions>
            </Card>
            <BackButton />
        </>
    );
};
