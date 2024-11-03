import React from "react";
import { ListProducts } from "../../common/ListProducts";
import { Typography } from "@mui/material";
import BackButton from "../../common/Volver";

export const Tienda = () => {
    return (
        <>
            <Typography
                variant="h4"
                color="initial"
                textAlign={"center"}
                sx={{ mt: 8, mb: 4 }}
            >
                Nuestros Productos
            </Typography>
            <ListProducts />
            <BackButton />
        </>
    );
};