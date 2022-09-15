import { GitHub, Info, Title } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';



const About = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card sx={{ minWidth: 300, height: 400, m: 30, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                <CardContent>
                    <CardHeader title='About this app' sx={{ textAlign: 'center' }} />
                    <Divider />
                    <Typography variant='body2' color='text.secondary' sx={{ mt: 2, mb: 5 }}>Version: v1.0</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 5 }}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum qui quia dolorem reprehenderit expedita inventore sed praesentium. Animi fuga iste debitis necessitatibus et a temporibus, soluta ducimus, recusandae, aspernatur suscipit.
                    </Typography>
                    <Divider />
                </CardContent>
                <CardActions>
                    <Typography>Checkout our project on </Typography>
                    <Button size='medium' component={Link} to='https://github.com/souravmishra-msft/One-Portal' variant='text' target='_blank' sx={{ textAlign: 'center' }}> Github</Button>
                </CardActions>
            </Card>
        </Box >
    )
}

export default About