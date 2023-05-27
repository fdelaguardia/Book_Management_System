
import { AppBar, Toolbar, Button, Stack, Avatar, Drawer, IconButton, ButtonGroup, Box } from '@mui/material'
import BookIcon from '@mui/icons-material/AutoStoriesTwoTone';
import { useState } from 'react';

const NavBar = () => {

    const getToken = () => {
        return localStorage.getItem("token")
    }

    const [ isDrawerOpen, setIsDrawerOpen ] = useState(false)

  return (
    <AppBar position='fixed' color='primary' >
        <Toolbar className='nav-bar' >
            <IconButton size='large' edge='start' color='inherit' >
                <BookIcon size='large' />
            </IconButton>

            <h3>Book Management System</h3>

            {
                getToken?
                <Stack>
                    <IconButton size='small' edge='start' color="inherit" 
                    onClick={() => { setIsDrawerOpen(true) }} >
                        <Avatar sx={{ backgroundColor: 'white', color: 'primary.dark' }} >FD</Avatar>
                    </IconButton>

                    <Drawer anchor='right' open={isDrawerOpen} 
                    onClose={() => {setIsDrawerOpen(false)}} >    
                        <Box width='200px' p={2} textAlign={'center'} >
                            <ButtonGroup variant='text' orientation='vertical' size='large' color='primary' >
                                <Button>Add Book</Button>
                                <Button>Favorite Books</Button>
                                <Button>Currently Reading</Button>
                                <Button>Logout</Button>
                            </ButtonGroup>
                        </Box>                   
                    </Drawer>
                </Stack>
                :
                <Stack direction={'row'} spacing={2} >
                    <IconButton size='small' edge='start' color="inherit"
                        onClick={() => { setIsDrawerOpen(true) }} >
                        <Avatar sx={{ backgroundColor: 'white', color: 'primary.dark' }} ></Avatar>
                    </IconButton>

                      <Drawer anchor='right' open={isDrawerOpen}
                      onClose={() => { setIsDrawerOpen(false) }} >
                            <Box width='200px' p={2} textAlign={'center'} >
                                <ButtonGroup variant='text' orientation='vertical' size='large' color='primary' >
                                      <Button sx={{ paddingRight: '70px', paddingLeft: '70px' }} >Log in</Button>
                                    <Button>Sign up</Button>
                                </ButtonGroup>
                            </Box>
                        </Drawer>
                </Stack>
            }
            
        </Toolbar>
    </AppBar>
  )
}

export default NavBar