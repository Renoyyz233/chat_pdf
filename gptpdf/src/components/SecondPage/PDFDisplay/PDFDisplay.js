import React, { useState, useEffect, useRef, createRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Box, IconButton, TextField, Typography, Button } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './PDFDisplay.css';
import axios from 'axios';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfDisplay = ({ filename }) => {
    const [numPages, setNumPages] = useState(null);
    const [scale, setScale] = useState(1.8);
    const [file, setFile] = useState(null);
    const [jumpToPage, setJumpToPage] = useState("");

    const pageRefs = useRef([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/uploads/${filename}`, { responseType: 'arraybuffer' })
            .then(response => {
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                    ),
                );
                setFile(`data:application/pdf;base64,${base64}`);
            });
    }, [filename]);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        pageRefs.current = Array(numPages).fill().map((_, i) => pageRefs.current[i] ?? createRef());
    }

    function handleJumpToPage() {
        const pageNumber = Number(jumpToPage);
        if (pageNumber && pageNumber >= 1 && pageNumber <= numPages) {
            pageRefs.current[pageNumber - 1].current.scrollIntoView({ behavior: 'smooth' });
        }
        else {
            alert('Please enter a valid page number.');
        }
    }

    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginBottom: 0 }}>
                <IconButton onClick={() => setScale(prevScale => Math.max(prevScale - 0.1, 0.1))}>
                    <ZoomOutIcon />
                </IconButton>
                <IconButton onClick={() => setScale(prevScale => prevScale + 0.1)}>
                    <ZoomInIcon />
                </IconButton>
                <TextField
                    type="number"
                    value={jumpToPage}
                    onChange={(e) => setJumpToPage(e.target.value)}
                    sx={{ width: '4em', marginBottom: 0 }}  // set the width to fit about 3 digits and reduce bottom margin
                />
                <Button onClick={handleJumpToPage} sx={{ marginBottom: 0 }}>
                    Jump
                </Button>
            </Box>
            <Box className="app" overflow="auto" height="90vh">
                <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <div ref={pageRefs.current[index]} key={`page_${index + 1}`} style={{ marginBottom: '0px' }}>
                            <Page pageNumber={index + 1} scale={scale} />
                        </div>
                    ))}
                </Document>
            </Box>

        </>
    );
};


export default PdfDisplay;
