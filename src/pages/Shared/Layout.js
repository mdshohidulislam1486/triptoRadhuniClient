import { AppBar, Badge, Box, Button, Container, createTheme, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Switch, ThemeProvider, Toolbar, Typography, useTheme } from '@mui/material';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../utilities/Store';
import useStyles from '../utilities/style';
import CssBaseline from '@mui/material/CssBaseline';
import Cookies from 'js-cookie';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import useAuth from '../hooks/useAuth';



const Layout = ({children, title, description}) => {
const {state, dispatch} = useContext(Store)
const {admin} = useAuth()
const {darkMode, cart} =state
const navTheme = useTheme()
const classes = useStyles()
const theme = createTheme({
    typography: {
                h1: {
                fontSize: '1.6rem',
                fontWeight: 400,
                margin: '1rem 0',
                },
                h2: {
                fontSize: '1.4rem',
                fontWeight: 400,
                margin: '1rem 0',
                },
            },
            palette: {
                mode: darkMode ? 'dark' : 'light',
                primary: {
                main: '#f0c000',
                },
                secondary: {
                main: '#208080',
                },
            },
        })
            const darkModeHandler = () =>{
                dispatch({type: darkMode? 'DARK_MODE_OFF': 'DARK_MODE_ON' })
                const newDarkMode = !darkMode;
                Cookies.set('darkMode', newDarkMode? 'ON' : 'OFF')
            }

            const navStyle = makeStyles({
                navIcon:{
                    [navTheme.breakpoints.up('sm')]: {
                        display:"none"
                    },
                },
                navItems:{
                    [navTheme.breakpoints.down('md')]: {
                        display:"none"
                    },
                },
            
                
            })
            const {navIcon, navItems } = navStyle()
            const [navState, setState] = React.useState(false);
            const {user, logOut} = useAuth()
            
            const list = (
                <Box
                sx={{ width:250 }}
                role="presentation"
                >
                <List>
                    <ListItem button >
                        <ListItemIcon>
                         <InboxIcon />  
                        </ListItemIcon>
                        <ListItemText>Home </ListItemText>
                    </ListItem>
                    <ListItem button >
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText>About</ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                    ))}
                </List>
                </Box>
            );
    const handleLogOut = () =>{
        logOut() 
        dispatch({type:'USER_LOGOUT'})
        Cookies.remove('userInfo')
        Cookies.remove('cartItems')
    }
    return (
        <>
            <head>
                <title>{title? `${title} - Tripto Radhuni`: 'Tripto Radhuni'} </title>
                {description && <meta name='descripton' content={description}> </meta>}
            </head>
            <ThemeProvider theme={theme}>
                <CssBaseline></CssBaseline>
                <Box sx={{ flexGrow: 1 }}>
                <AppBar  sx={{backgroundColor:'#203040', color:'#fff', display:'flex', flexDirection:"row", alignItems:'center', justifyContent:'space-between', mb:5}} position='static'
                className={classes.navBar}>
                    <Toolbar>
                        
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            className={navIcon}
                            onClick={()=> setState(true)}
                        >
                        <MenuIcon className={navIcon}/>
                        </IconButton >
                        
                       
                       <Link style={{textDecoration:"none"}} to='/'><Typography  >Tripto Radhuni</Typography></Link>
                    
                    </Toolbar>
                    <Box className={navItems}>
                        <Switch checked={darkMode}onChange={darkModeHandler}></Switch>
                        <Link to='/' style={{textDecoration:'none'}}><Button color='inherit'>Home</Button></Link>
                       { admin && <Link to='/dashboard/productlist' style={{textDecoration:'none'}}><Button color='inherit'>Admin Panel</Button></Link>}
                        <Link to='/cart' style={{textDecoration:'none'}}><Button color='inherit'>
                        {cart.cartItems?.length > 0 ? <Badge badgeContent={cart.cartItems?.length}>Cart</Badge> : 'Cart'}    
                        </Button></Link>
                        
                        {user?.email ? <Button onClick={()=> handleLogOut()}>Logout</Button>:
                        <Link to='/login'><Button color="inherit">Login</Button></Link>}
                    </Box>
                    </AppBar>
                    </Box>
                <Container className={classes.main}>
                        {children}
                </Container>
                <footer className={classes.footer}>
                    <Typography >
                        All rights reserved to Tripto Radhuni 
                    </Typography>
                </footer>
            </ThemeProvider>

            <Box>
                 <React.Fragment >
                    <Drawer
                        open={navState}
                        onClose={()=>setState(false)}
                    >
                        {list}
                    </Drawer>
                </React.Fragment>
            </Box>
            
        </>
    );
};

export default Layout;