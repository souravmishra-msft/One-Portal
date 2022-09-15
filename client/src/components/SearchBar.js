import { Search } from '@mui/icons-material';
import { Box, InputAdornment, Pagination, Stack, styled, TextField, Typography } from '@mui/material'
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
    overflow: 'none',
    // background: '#141414',
    padding: 10,
}));


const listItemsUrl = "http://localhost:5001/api/v1/list-urls";

const SearchBar = () => {
    const [searchTxt, setSearchTxt] = useState();
    const [apiData, setApiData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

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

    const itemsPerPage = 5;
    const pageCount = Math.ceil(apiData.length / itemsPerPage);
    const pagesVisited = pageNumber * itemsPerPage;

    const displayItems = apiData
        .slice(pagesVisited, pagesVisited + itemsPerPage)
        .map(item => {
            return (<ItemList key={item._id} data={item} />)
        });


    // useEffect(() => {
    //     const fetchApiData = async () => {
    //         const response = await axios.get(listItemsUrl);
    //         setApiData(response.data.data);
    //     };

    //     fetchApiData();
    // }, []);

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
                    {/* {apiData.map(d => (
                        <ItemList key={d._id} data={d} />
                    ))} */}
                    {displayItems}
                </Stack>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
                    <Stack spacing={2}>
                        <Pagination color='primary' count={pageCount} shape='rounded' onChange={(e, value) => setPageNumber(value)} />
                    </Stack>

                </Box>
            </ItemListBox>

        </MainContainer>
    )
}

export default SearchBar