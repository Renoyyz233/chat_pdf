// NewChatButton.js
import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const NewChatButton = () => {
    return (
        <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            New Chat
        </Button>
    );
};

export default NewChatButton;
