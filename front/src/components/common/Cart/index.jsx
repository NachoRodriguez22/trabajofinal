import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Typography,
    Box
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import config from '../../../config.js';
import { useAuth } from "../../utils/AuthContext";

export const Cart = ({ open, setOpen }) => {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchCartItems = async () => {
            if (open && user) {
                try {
                    const response = await axios.get(`${config.backend_url}cart/${user.user_id}`);

                    if (response.data) {
                        // Si existe un carrito, cargar los items
                        setCartItems(response.data.items);
                        setTotal(response.data.total_amount);
                    } else {
                        // Si no existe, crear un nuevo carrito
                        await axios.post(`${config.backend_url}cart`, { user_id: user.user_id });
                        // Volver a cargar los items del carrito
                        fetchCartItems();
                    }
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        // Crear un nuevo carrito si el error es "404 Not Found"
                        await axios.post(`${config.backend_url}cart`, { user_id: user.user_id });
                        fetchCartItems(); // Vuelve a intentar cargar el carrito
                    } else {
                        console.error("Error al obtener los items del carrito:", error);
                    }
                }
            }
        };

        fetchCartItems();
    }, [open, user]);

    const handleRemoveItem = async (cart_item_id) => {
        try {
            await axios.delete(`${config.backend_url}cartItem/${cart_item_id}`);
            const updatedCartItems = cartItems.filter(item => item.cart_item_id !== cart_item_id);
            setCartItems(updatedCartItems);
            const newTotal = updatedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            setTotal(newTotal);
        } catch (error) {
            console.error("Error al eliminar el producto del carrito:", error);
        }
    };

    return (
        <Drawer
            onClose={() => setOpen(false)}
            open={open}
            sx={{
                width: 300,
                "& .MuiDrawer-paper": {
                    width: 300,
                    boxSizing: "border-box",
                    overflowY: "auto",
                },
            }}
        >
            <Box sx={{ p: 2 }}>
                <Typography variant="h5" gutterBottom>Carrito de Compras</Typography>
                <List>
                    {cartItems.length === 0 ? (
                        <Typography variant="body1">Tu carrito está vacío.</Typography>
                    ) : (
                        cartItems.map((item) => (
                            <ListItem key={item.cart_item_id} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ShoppingCartIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.product_name}
                                        secondary={`Cantidad: ${item.quantity} - Precio: $${item.price}`}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" onClick={() => handleRemoveItem(item.cart_item_id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItemButton>
                            </ListItem>
                        ))
                    )}
                </List>
                <Typography variant="h6" sx={{ mt: 2 }}>Total: ${total}</Typography>
            </Box>
        </Drawer>
    );
};
