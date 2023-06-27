import React from 'react';
import { Button, Popover } from 'antd';
import { Box, Stack } from '@mui/material';
import { popoverData } from './popoverContent/popoverContent';
import './ContentList.css'; // import the CSS file

const ContentList = () => {
    return (
        <div className="container"> {/* apply the class to the wrapper div */}
            <Box p={2}>
                <Stack direction="row" spacing={2} justifyContent="center">
                    {popoverData.map(({ title, content }) => (
                        <Popover
                            title={title}
                            content={
                                <div
                                    style={{
                                        maxWidth: '40vw',
                                        maxHeight: '25vh',
                                        overflow: 'auto'
                                    }}
                                    dangerouslySetInnerHTML={{ __html: content }}
                                />
                            }
                            trigger="click"
                        >
                            <Button>{title}</Button>
                        </Popover>
                    ))}
                </Stack>
            </Box>
        </div>
    );
};

export default ContentList;
