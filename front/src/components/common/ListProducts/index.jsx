import React, { useEffect, useState } from 'react';
import { Product } from '../Product';
import axios from 'axios';
import config from '../../../config.js';
import { Grid2, Button, Box, Typography } from '@mui/material';

export const ListProducts = () => {
    const [products, setProducts] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('price'); // Estado para la ordenación (por precio o nombre)
    const [sortOrder, setSortOrder] = useState('asc'); // Estado para la ordenación (ascendente o descendente)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${config.backend_url}products`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    // Función para manejar el cambio de orden
    const handleSortChange = (criteria, order) => {
        setSortCriteria(criteria);
        setSortOrder(order);
    };

    // Ordenar los productos antes de renderizarlos
    const sortedProducts = [...products].sort((a, b) => {
        if (sortCriteria === 'price') {
            // Ordenar por precio
            return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
        } else if (sortCriteria === 'name') {
            // Ordenar por nombre
            return sortOrder === 'asc'
                ? a.product_name.localeCompare(b.product_name)
                : b.product_name.localeCompare(a.product_name);
        }
        return 0; // Por defecto, no hacer nada
    });

    return (
        <>
            <Box sx={{ mb: 2, textAlign: 'center', margin: 2 }}>
                <Typography variant="h6">Ordenar por:</Typography>
                <Button
                    variant={sortCriteria === 'price' && sortOrder === 'asc' ? 'contained' : 'outlined'}
                    onClick={() => handleSortChange('price', 'asc')}
                    sx={{ margin: 1 }}
                >
                    Precio Ascendente
                </Button>
                <Button
                    variant={sortCriteria === 'price' && sortOrder === 'desc' ? 'contained' : 'outlined'}
                    onClick={() => handleSortChange('price', 'desc')}
                    sx={{ margin: 1 }}
                >
                    Precio Descendente
                </Button>
                <Button
                    variant={sortCriteria === 'name' && sortOrder === 'asc' ? 'contained' : 'outlined'}
                    onClick={() => handleSortChange('name', 'asc')}
                    sx={{ margin: 1 }}
                >
                    Nombre Ascendente
                </Button>
                <Button
                    variant={sortCriteria === 'name' && sortOrder === 'desc' ? 'contained' : 'outlined'}
                    onClick={() => handleSortChange('name', 'desc')}
                    sx={{ margin: 1 }}
                >
                    Nombre Descendente
                </Button>
            </Box>
            <Grid2 container sx={{ display: "flex", justifyContent: "space-evenly" }}>
                {sortedProducts.map((product) => (
                    <Product
                        key={product.product_id}
                        product_id={product.product_id}
                        nombre={product.product_name}
                        descripcion={product.descripcion}
                        precio={product.price}
                        imagen_url={`${config.backend_url}images/${product.imagen_url}`}
                    />
                ))}
            </Grid2>
        </>
    );
};
