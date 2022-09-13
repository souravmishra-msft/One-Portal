import { Favorite, GitHub, Info, Menu } from '@mui/icons-material';
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { useState } from 'react';

const LeftDrawer = () => {
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <React.Fragment>
            <Drawer>
                <Box sx={{ width: '250px', minWidth: '200px' }}>
                    <List >
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon><Favorite /></ListItemIcon>
                                <ListItemText primary='Favourites' />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon><Info /></ListItemIcon>
                                <ListItemText primary='About' />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon><GitHub /></ListItemIcon>
                                <ListItemText primary='Project' />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            <IconButton onClick={() => { console.log(`BtnClicked`); setOpenDrawer(!openDrawer); console.log(openDrawer) }} sx={{ color: '#ffff', marginLeft: 'auto' }}>
                <Menu />
            </IconButton>

        </React.Fragment>
    )
}

export default LeftDrawer