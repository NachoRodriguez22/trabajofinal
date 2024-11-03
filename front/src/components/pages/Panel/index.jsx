import React from 'react';
import { Box } from '@mui/material';
import Logout from '../../common/Logout';
import BackButton from '../../common/Volver';

export const Panel = () => {
    return <>
        <Box>
            <Logout />
        </Box>
        <BackButton />
    </>
};
