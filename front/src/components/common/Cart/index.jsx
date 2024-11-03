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

export const Cart = ({ open, setOpen }) => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Cargar items del carrito cuando el Drawer se abre
        if (open) {
            const fetchCartItems = async () => {
                try {
                    const response = await axios.get(`${config.backend_url}cart`);
                    setCartItems(response.data.items);
                    setTotal(response.data.total_amount);
                } catch (error) {
                    console.error("Error al obtener los items del carrito:", error);
                }
            };
            fetchCartItems();
        }
    }, [open]);

    const handleRemoveItem = async (cart_item_id) => {
        try {
            await axios.delete(`${config.backend_url}cartItem/${cart_item_id}`);
            setCartItems(cartItems.filter(item => item.cart_item_id !== cart_item_id));
            const itemPrice = cartItems.find(item => item.cart_item_id === cart_item_id).total_price;
            setTotal(total - itemPrice);
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
