// ChatMessage.js
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@mui/material';
import './ChatMessage.css'; // Import the CSS file
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import CloudIcon from '@mui/icons-material/Cloud';

const ChatMessage = ({ message }) => {
    console.log(message.sender);
    const messageWithLineBreaks = message.content.split('\n').map((text, index) => (
        <React.Fragment key={index}>
            {text}
            <br />
        </React.Fragment>
    ));

    const userMessageColor = "#ffffff"; // Change this to your preferred color
    const serverMessageColor = "#fdf4f4"; // Change this to your preferred color

    return (
        <ListItem
            alignItems="flex-start"
            className="chat-message"
            sx={{ bgcolor: message.sender === 'User' ? userMessageColor : serverMessageColor }}
        >
            <ListItemAvatar className="chat-message-avatar">
                <Avatar className="chat-message-avatar-icon">
                    {message.sender === 'User' ? <PersonIcon /> : <CloudIcon />}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                className="chat-message-text"
                primary={<div className="chat-message-content">{messageWithLineBreaks}</div>}
                secondary={
                    <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                        className="chat-message-sender"
                    >
                        {message.sender}
                    </Typography>
                }
            />
        </ListItem>
    );
};
export default ChatMessage;
