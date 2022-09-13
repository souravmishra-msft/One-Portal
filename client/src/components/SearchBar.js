import { Search } from '@mui/icons-material';
import { Box, InputAdornment, Stack, styled, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemList from './ItemList';


const MainContainer = styled(Box)(({ theme }) => ({
    width: '70%',
    height: '100vh',
    // backgroundColor: '#141414',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px'
}));

const SearchBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 'auto',
    backgroundColor: '#ffff',
    borderRadius: 5,
    margin: 10
}));

const ItemListBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 'auto',
    margin: 10,
    overflow: 'auto'
}));


const listItemsUrl = "http://localhost:5001/api/v1/list-urls";

const SearchBar = () => {
    const [searchTxt, setSearchTxt] = useState();
    const [apiData, setApiData] = useState([]);


    // useEffect(() => {
    //     const fetchApiData = async () => {
    //         const response = await axios.get(listItemsUrl);
    //         setApiData(response.data.data);
    //     };

    //     fetchApiData();
    // }, []);


    useEffect(() => {
        if (searchTxt === "" || searchTxt === undefined) {
            axios.get(`http://localhost:5001/api/v1/list-urls`).then((response) => {
                // console.log(response.data.data);
                setApiData(response.data.data);
            });
        } else if (searchTxt.length !== 0) {
            axios.get(`http://localhost:5001/api/v1/search/${searchTxt}`).then((response) => {
                // console.log(response.data);
                setApiData(response.data.searchData);
            });
        }
    }, [searchTxt]);

    return (
        <MainContainer>
            <SearchBox>
                <TextField
                    variant='filled'
                    label='Search'
                    InputProps={{ startAdornment: (<InputAdornment position='start'><Search /></InputAdornment>) }}
                    sx={{ width: '100%' }}
                    onChange={(e) => setSearchTxt(e.target.value)}
                />
            </SearchBox>

            < ItemListBox>
                <Stack spacing={2}>
                    {apiData.map(d => (
                        <ItemList key={d._id} data={d} />
                    ))}
                </Stack>
            </ItemListBox>
        </MainContainer>
    )
}

export default SearchBar