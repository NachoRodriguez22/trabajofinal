import React from "react";
import {
    Drawer,
    List,
} from "@mui/material";
import { Panel } from "../../pages/Panel";

export const Sidebar = ({ open, setOpen }) => {
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
            <List sx={{ padding: 5 }}>
                <Panel />
            </List>
        </Drawer>
    );
};