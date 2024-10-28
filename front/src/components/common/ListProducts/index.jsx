import React, { useEffect, useState } from 'react'
import { Product } from '../Product';
import axios from "axios";
import config from '../../../config.js'
import { Grid2 } from '@mui/material';

export const ListProducts = () => {
    const [products, setProducts] = useState([
    ])

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(`${config.backend_url}products`)
            setProducts(response.data);
        }

        fetch()
    }, [])


    return (
        <>
            <Grid2 container sx={{ display: "flex", justifyContent: "space-evenly" }}>
                {products.map((product) => (
                    <Product
                        key={product.product_id}
                        nombre={product.product_name}
                        descripcion={product.descripcion}
                        precio={product.price}
                        imagen={product.imagen_url}
                    />
                ))
                }
            </Grid2>
        </>
    )
}
