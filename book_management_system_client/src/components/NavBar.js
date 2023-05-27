
import { AppBar, Toolbar, Button, Stack, Avatar, Drawer, IconButton, ButtonGroup, Box } from '@mui/material'
import BookIcon from '@mui/icons-material/AutoStoriesTwoTone';
import { useState } from 'react';

const NavBar = () => {

    const [ isDrawerOpen, setIsDrawerOpen ] = useState(false)

  return (
    <AppBar position='fixed' color='primary' >
        <Toolbar className='nav-bar' >
            <IconButton size='large' edge='start' color='inherit' >
                <BookIcon size='large' />
            </IconButton>

            <h3>Book Management System</h3>

            <Stack>
                <IconButton size='small' edge='start' color="inherit" 
                onClick={() => { setIsDrawerOpen(true) }} >
                      <Avatar sx={{ backgroundColor: 'white', color: 'primary.dark' }} >FD</Avatar>
                </IconButton>

                <Drawer anchor='right' open={isDrawerOpen} 
                onClose={() => {setIsDrawerOpen(false)}} >
                    <Box p={2} textAlign='left' >
                          <ButtonGroup variant='text' orientation='vertical' size='large' color='primary' >
                            <Button>Add Book</Button>
                            <Button>Favorite Books</Button>
                            <Button>Currently Reading</Button>
                            <Button>Logout</Button>
                        </ButtonGroup>
                    </Box>
                </Drawer>
            </Stack>
            
        </Toolbar>
    </AppBar>
  )
}

export default NavBar