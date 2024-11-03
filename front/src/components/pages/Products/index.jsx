import React from 'react'
import { Button, Grid2 } from '@mui/material'
import { Link } from "react-router-dom";
import BackButton from '../../common/Volver';

export const Product = () => {
    return (
        <>
            <Grid2
                container
                spacing={2}
                sx={{
                    ml: "auto",
                    mr: 4,
                    display: { xs: "none", md: "flex" },
                }}
            >
                <Button variant='contained'>
                    <Link to={"/create-product"} style={{ color: "white", textDecoration: "none" }}>
                        Crear Nuevo Producto
                    </Link>
                </Button>
                <Button variant='contained'>
                    <Link to={"/mod-products"} style={{ color: "white", textDecoration: "none" }}>
                        Modificar Producto
                    </Link>
                </Button>
            </Grid2 >
            <BackButton />
        </>
    )
}
