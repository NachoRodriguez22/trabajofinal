import React from 'react'
import { Button, Grid2 } from '@mui/material'
import { Link } from "react-router-dom";
import BackButton from '../../common/Volver';

export const AdminPanel = () => {
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
                    <Link to={"/users"} style={{ color: "white", textDecoration: "none" }}>
                        Usuarios
                    </Link>
                </Button>
                <Button variant='contained'>
                    <Link to={"/products"} style={{ color: "white", textDecoration: "none" }}>
                        Productos
                    </Link>
                </Button>
            </Grid2 >
            <BackButton />
        </>
    )
}
