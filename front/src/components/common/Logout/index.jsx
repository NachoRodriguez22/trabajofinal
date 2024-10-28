import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate('/logout-confirmation');
    };

    return (
            <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
            >
                Logout
            </Button>
    );
};

export default Logout;
