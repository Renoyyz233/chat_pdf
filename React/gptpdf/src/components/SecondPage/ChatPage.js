import React, { useState } from 'react';
import { Box, IconButton, Collapse } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import NewChatButton from './NewChatButton/NewChatButton';
import PDFDisplay from './PDFDisplay/PDFDisplay';
import ChatComponent from './ChatComponent/ChatComponent';
import { useLocation } from "react-router-dom";

const ChatPage = () => {
    const [pdfDisplayVisible, setPdfDisplayVisible] = useState(true);
    const location = useLocation();
    const filename = location.state.filename;
    console.log("Filename:", filename);

    return (
        <Box display="flex" flexDirection="row" justifyContent="center">
            <Box width="15%" height="100vh" flexShrink={0} sx={{ backgroundColor: '#333', color: '#fff' }} display="flex" flexDirection="column" alignItems="center">
                <NewChatButton />
            </Box>
            <Box width={pdfDisplayVisible ? "45%" : "0%"} height="100vh" overflow="hidden">
                <Collapse in={pdfDisplayVisible}>
                    <PDFDisplay filename={filename} />
                </Collapse>
            </Box>
            <Box width={pdfDisplayVisible ? "40%" : "85%"} height="100vh" flex={1} display="flex" flexDirection="column" alignItems="center">
                <Box display="flex" justifyContent="center" alignItems="center" width="100%">
                    <IconButton onClick={() => setPdfDisplayVisible(!pdfDisplayVisible)}>
                        {pdfDisplayVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                    <Box sx={{ position: 'absolute', right: 0 }}>
                        <IconButton onClick={() => { /* handle delete action here */ }}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Box flexGrow={1} width="100%">  {/* Add width="100%" here */}
                    <ChatComponent />
                </Box>
            </Box>
        </Box>
    );
};

export default ChatPage;
