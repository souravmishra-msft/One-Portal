import React, { useContext, useEffect, useState } from 'react';
import { Box, Link, Paper, styled, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import axios from 'axios';
import { Delete } from '@mui/icons-material';

const MainContainer = styled(Box)(({ theme }) => ({
    width: '70%',
    height: '100vh',
    // backgroundColor: '#141414',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
}));

const FavItem = styled(Paper)(({ theme }) => ({
    backgroundColor: '#FFFF',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.text.secondary,
    marginTop: 20,
    width: '100%',
}));

const FavItemListBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 'auto',
    margin: 10,
    overflow: 'auto',
}));

const FavItemContentBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
}));

const getAllFavApi = 'http://localhost:5001/api/v1/getFavList';

const Favorites = () => {
    const [favItems, setFavItems] = useState([]);

    const headers = {
        'Content-Type': 'application/json',
    }

    useEffect(() => {
        const fetchFavsData = async () => {
            const favItemList = await axios.get(getAllFavApi, null, {
                headers: headers
            });

            setFavItems(favItemList.data.data);
        }

        fetchFavsData();
    }, []);

    return (
        <Box>
            <Stack spacing={2} alignItems='center'>
                <MainContainer>
                    {favItems.length === 0
                        ? <Typography>No Favorites available.</Typography>
                        : <FavItemListBox>
                            <Stack spacing={2} alignItems='center'>
                                {favItems.map(d => (
                                    <FavItem key={d._id} >
                                        <FavItemContentBox>
                                            <Typography noWrap>{d.portal_name}</Typography>
                                            <Delete sx={{ color: 'red', cursor: 'pointer' }} />
                                        </FavItemContentBox>
                                        <FavItemContentBox>
                                            <Typography noWrap component={Link} to={d.portal_url}>{d.portal_url}</Typography>
                                        </FavItemContentBox>
                                    </FavItem>
                                ))}
                            </Stack>
                        </FavItemListBox>}
                </MainContainer>
            </Stack>
        </Box>

    );
}

export default Favorites