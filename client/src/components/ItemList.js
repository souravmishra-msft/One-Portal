import { Alert, Box, Checkbox, Link, Paper, Snackbar, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import axios from 'axios';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#FFFF',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.text.secondary,
}));

const ItemContentBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

const AddToFavApi = 'http://localhost:5001/api/v1/addToFavList';


const ItemList = ({ data }) => {
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const headers = {
        'Content-Type': 'application/json',
    };


    const addFav = async (id) => {
        const body = { id: id };
        const response = await axios.post(AddToFavApi, body, {
            headers: headers
        });

        setMessage(response.data.message);
        setSnackBarOpen(true);
    };


    const handleCheckedIcon = async (data) => {
        addFav(data._id);

    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarOpen(false);
    }

    return (
        <>
            <Item key={data._id} >
                <ItemContentBox>
                    <Typography noWrap>{data.portal_name}</Typography>
                    <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: 'red' }} />} onClick={e => handleCheckedIcon(data)} />
                </ItemContentBox>
                <ItemContentBox>
                    <Typography noWrap component={Link} to={data.portal_url}>{data.portal_url}</Typography>
                </ItemContentBox>
            </Item>

            <Snackbar autoHideDuration={4000} open={snackBarOpen} onClose={handleClose}>
                <Alert onClose={handleClose} severity='success'>{message}</Alert>
            </Snackbar>
        </>
    )
}

export default ItemList