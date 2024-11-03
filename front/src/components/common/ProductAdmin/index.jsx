import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, CardActionArea, CardActions } from '@mui/material';


export const ProductAdmin = ({ product_id, nombre, descripcion, precio, imagen_url }) => {
    const navigate = useNavigate();

    const handleProductClick = () => {
        navigate(`/edit-product/${product_id}`);
    };


    return (
        <Card onClick={handleProductClick} style={{ cursor: 'pointer' }} sx={{ width: 300, height: 300, margin: 1 }}>
            <CardActionArea>
                <CardMedia component="img" height="140" image={imagen_url} alt={nombre} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{nombre}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{descripcion}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{precio}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" variant="outlined">Editar {nombre}</Button>
            </CardActions>
        </Card>
    )
}