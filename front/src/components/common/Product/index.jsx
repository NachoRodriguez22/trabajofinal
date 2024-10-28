import React, { useEffect } from 'react'
import config from '../../../config.js'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

export const Product = ({ nombre, imagen, descripcion, precio }) => {
    useEffect(() => {

    }, [])

    return (
        <>
            <Card sx={{ maxWidth: 300, margin: 1 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={config.backend_url + "images/" + imagen}
                        alt={nombre}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {nombre}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {descripcion}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" variant="outlined">
                        Comprar $ {precio}
                    </Button>
                    <Button size="small" color="primary" variant='contained'>
                        Agregar al carrito
                    </Button>
                </CardActions>
            </Card>

        </>
    )
}
