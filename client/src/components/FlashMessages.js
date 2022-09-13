import React, { forwardRef, useEffect, useState } from 'react';
import { Box, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

const FlashMessages = ({ message }) => {

    console.log(message);
    const [open, setOpen] = useState(true);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    console.log(open)
    return (
        <Box>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity='success'>{message}</Alert>
            </Snackbar>

        </Box>
    )
}

export default FlashMessages