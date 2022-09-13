import { Box, Stack } from '@mui/material';
import React from 'react';
import Navbar from './Navbar';
import SearchBar from './SearchBar';



const Home = () => {
    return (
        <Box>
            {/* <Navbar /> */}
            <Stack spacing={2} alignItems='center' >
                <SearchBar />
            </Stack>
        </Box>
    )
}

export default Home