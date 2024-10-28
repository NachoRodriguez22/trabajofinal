import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Grid2,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Sidebar } from "../Sidebar";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Cart } from "../../common/Cart";

export const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleOpen2 = () => {
        setOpen2(true);
    };

    return (
        <>
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleOpen}
                    >
                        <Menu />
                    </IconButton>

                    <Typography variant="h6" sx={{ ml: 2, textTransform: "uppercase" }}>
                        Mi Tienda
                    </Typography>

                    {/* Menus */}
                    <Grid2
                        container
                        spacing={2}
                        sx={{
                            ml: "auto",
                            mr: 4,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        <Button variant="text" color="default">
                            <Link to={"/panel"} style={{ color: "white", textDecoration: "none" }}>
                                Panel
                            </Link>
                        </Button>
                        <Button variant="text" color="default">
                            <Link
                                to={"/contacto"}
                                style={{ color: "white", textDecoration: "none" }}
                            >
                                Contacto
                            </Link>
                        </Button>
                        <Button variant="text" color="default">
                            <Link
                                to={"/tienda"}
                                style={{ color: "white", textDecoration: "none" }}
                            >
                                Tienda
                            </Link>
                        </Button>
                    </Grid2>

                    <IconButton sx={{ ml: "auto" }} edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleOpen2}>
                        <ShoppingCartIcon fontSize="large" sx={{ color: "white" }} />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div style={{ height: "64px" }} />

            <Sidebar open={open} setOpen={setOpen} />
            <Cart open={open2} setOpen={setOpen2} />
        </>
    );
};