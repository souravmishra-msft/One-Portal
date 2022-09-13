import { Box, Checkbox, Link, Paper, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import axios from 'axios';
import FlashMessages from './FlashMessages';


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

const FlashMessageType = {
    success: "success",
    fail: "fail",
};

const ItemList = ({ data }) => {
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const headers = {
        'Content-Type': 'application/json',
    };


    const addFav = async (id) => {
        const body = { id: id };
        const response = await axios.post(AddToFavApi, body, {
            headers: headers
        });

        setMessage(response.data.message);
    };


    const handleCheckedIcon = async (data) => {
        setSuccess(true);
        addFav(data._id);
        setSuccess(false);
    }

    // console.log(success)

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
            {success ? <FlashMessages message={message} /> : ''}
        </>
    )
}

export default ItemList