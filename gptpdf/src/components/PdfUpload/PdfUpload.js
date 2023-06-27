import React, { useState } from "react";
import { Button, CircularProgress, Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import { blue, grey } from "@mui/material/colors";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const UploadButton = styled(Button)(({ theme }) => ({
    // hover effect removed
}));

const UploadContainer = styled(Paper)(({ theme }) => ({
    width: '800px',
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
    backgroundColor: '#f3f3f3',
}));

const DashLine = styled('label')(({ theme }) => ({
    width: '99.9%',
    height: '99.9%',
    border: `3px dashed ${grey[400]}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'border .3s',
    cursor: 'pointer',
    "&:hover": {
        borderColor: blue[700],
    },
}));

const HiddenFileInput = styled('input')({
    display: 'none',
});

const PdfUpload = () => {
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile.size > 1024 * 1024*50) {
            alert("File is too big!");
            e.target.value = null;
            return;
        }
        setLoading(true);
        // Create a FormData object and append the file to it
        const data = new FormData();
        data.append('file', e.target.files[0]);
        console.log('Response from server:', data);
        // Send a POST request to your Flask server
        axios.post('http://localhost:5000/upload', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log('Response from server:', response);
                const filename = response.data.filename;
                setLoading(false);
                navigate('/chat', { state: { filename: filename }});  // Pass filename as state
            })
            .catch((error) => {
                console.error('Error from server:', error);
            });

    };


    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="50vh" // Adjust this value as needed
            bgcolor="#f3f3f3"
        >
            <Typography variant="h3" component="div" gutterBottom style={{ fontWeight: 'bold' }}>
                Chat with your PDF
            </Typography>
            <UploadContainer>
                <DashLine htmlFor="file-upload">
                    <UploadButton
                        variant="contained"
                        component="span"
                        color="primary"
                        startIcon={<AddIcon />}
                        disabled={loading}
                    >
                        Upload File
                    </UploadButton>
                    <HiddenFileInput id="file-upload" type="file" accept=".pdf" onChange={handleFileChange} disabled={loading} />
                    {loading && <CircularProgress />}
                </DashLine>
            </UploadContainer>
        </Box>
    );
};

export default PdfUpload;
