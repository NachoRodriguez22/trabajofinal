import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import config from '../../../config';
import FileUpload from "../../common/FileUpload"
import Logout from '../../common/Logout';

export const AdminPanel = () => {
    return (
        <Box>
            <Logout />
        </Box>
    );
};
