import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, CardActionArea, CardActions } from '@mui/material';


export const Product = ({ product_id, nombre, descripcion, precio, imagen_url }) => {
    const navigate = useNavigate();

    const handleProductClick = () => {
        navigate(`/tienda/${product_id}`);
    };


    return (
        <Card onClick={handleProductClick} style={{ cursor: 'pointer' }} sx={{ maxWidth: 300, margin: 1 }}>
            <CardActionArea>
                <CardMedia component="img" height="140" image={imagen_url} alt={nombre} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{nombre}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{descripcion}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" variant="outlined">Comprar $ {precio}</Button>
                <Button size="small" color="primary" variant='contained'>Agregar al carrito</Button>
            </CardActions>
        </Card>
    )
}