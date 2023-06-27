// ChatComponent.js
import { IconButton } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { Box, List } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatMessage from './ChatMessage/ChatMessage';
import './ChatComponent.css';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import ArrowCircleDownOutlined from '@mui/icons-material/ArrowCircleDownOutlined';


const ChatComponent = () => {
    const listRef = useRef(null);
    const [isOverflowed,setIsOverflowed] = useState(false);
    const [messages, setMessages] = useState([

    ]);
    const inputRef = useRef(null);
    const [newMessage, setNewMessage] = useState('');
    const textAreaRef = useRef(null);
    const [maxRowsReached, setMaxRowsReached] = useState(false);
    const [isWaitingResponse, setIsWaitingResponse] = useState(false); // New state
    const sendMessageToServer = (message) => {
        fetch('http://localhost:5000/message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        })
            .then(response => response.json())
            .then(data => {
                let time = new Date().toLocaleTimeString();
                setMessages(prevMessages => prevMessages.concat({ sender: 'Server', content: data.response, time: time }));
                setIsWaitingResponse(false); // Set isWaitingResponse back to false when a response is received
            });
    };
    const scrollToBottom = () => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        if (textAreaRef.current) {
            setMaxRowsReached(textAreaRef.current.scrollHeight > textAreaRef.current.clientHeight);
        }
        if (listRef.current) {
            setIsOverflowed(listRef.current.scrollHeight > listRef.current.clientHeight);
        }
    }, [newMessage]);

    const handleSend = () => {
        setMessages(prevMessages => prevMessages.concat({ sender: 'User', content: newMessage, time: '10:10 AM' }));
        sendMessageToServer(newMessage); // commnet it if for test
        setNewMessage('');
        setIsWaitingResponse(true); // commnet it if for test
    };
    const handleScroll = (e) => {
        if (listRef.current) {
            const bottom = Math.abs(e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight) < 5;
            if (bottom) {
                setIsOverflowed(false); // hide the button when scroll is at the bottom
            } else {
                setIsOverflowed(true); // show the button when scroll is not at the bottom
            }
        }
    };



    return (
        <Box className="ChatComponent">
            <List
                className="ChatComponent__list"
                ref={listRef}
                onScroll={handleScroll} // Add this prop
            >
                {messages.map((message, index) => (
                    <ChatMessage key={index} message={message} />
                ))}
            </List>
            <Box className="ChatComponent__box">
                <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    <IconButton
                        color="default"
                        className="ChatComponent__scrollToBottomButton" // Added new class
                        onClick={scrollToBottom}
                        style={{ visibility: isOverflowed ? 'visible' : 'hidden', marginRight: '10px' }}
                    >
                        <ArrowCircleDownOutlined />
                    </IconButton>

                    <TextareaAutosize
                        ref={textAreaRef}
                        minRows={1} // This sets the initial number of rows.
                        maxRows={18} // This sets the maximum number of rows.
                        className={`ChatComponent__textarea ${maxRowsReached ? "maxRowsReached" : ""}`}
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        onKeyPress={(event) => {
                            if (isWaitingResponse || (event.key === 'Enter' && !event.shiftKey)) {
                                event.preventDefault();
                                if (!isWaitingResponse) handleSend();
                            }
                        }}
                    />
                </div>

                <IconButton
                    color="default"
                    className={`ChatComponent__iconButton ${newMessage ? "enabled" : ""}`}
                    onClick={handleSend}
                    disabled={!newMessage || isWaitingResponse}
                >
                    {isWaitingResponse ? <CircularProgress size={24} /> : <SendIcon />}
                </IconButton>
            </Box>
        </Box>
    );

};

export default ChatComponent;
