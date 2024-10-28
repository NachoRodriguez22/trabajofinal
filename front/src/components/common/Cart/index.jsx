import React from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const Cart = ({ open, setOpen }) => {
    return (
        <Drawer
            onClose={() => setOpen(false)}
            open={open}
            sx={{
                width: 240,
                "& .MuiDrawer-paper": {
                    width: 240,
                    boxSizing: "border-box",
                    overflowY: "auto",
                },
            }}
        >
            <List sx={{ pt: 5 }}>
                <ListItem key={"asd"} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Carrito"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};