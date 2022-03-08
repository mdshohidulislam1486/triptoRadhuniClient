import { AppBar, Badge, Box, Button, Container, createTheme, Divider, Drawer, Grid, IconButton, InputBase, List, ListItem, ListItemIcon, ListItemText, Paper, Switch, ThemeProvider, Toolbar, Typography, useTheme } from '@mui/material';
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
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';




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
    const {
                cart: { shippingAddress },
              } = state;
        
    const handleLogOut = async() =>{
        axios.put('https://powerful-meadow-17770.herokuapp.com/shippingaddress', shippingAddress )
        .then(res =>{
            if(res?.data?.insertedId){
                alert('Shipping Address addeded')
            }
        })

        logOut() 
        dispatch({type:'USER_LOGOUT'})
        Cookies?.remove('userInfo')
        Cookies?.remove('cartItems')
        Cookies?.remove('shippingAddress')
        Cookies?.remove('paymentMethod')
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
                <footer  className={classes.footer}>
                    <Container>
                        <Box sx={{mt:3, mb:1, py:3}}>
                        <Grid container>
                            <Grid item xs={6} md={3} sx={{cursor:'pointer'}}>
                                <Typography variant='h1'>Info</Typography>
                                 
                                <Link style={{color:'#000', textDecoration:'none'}} to='/about'> <Typography>Customer service- </Typography> </Link>
                               <Link style={{color:'#000', textDecoration:'none'}} to='/about'> <Typography>About us- </Typography> </Link>
                                <a style={{color:'#000', textDecoration:'none'}} href="http://triptoboloyfoundation.org/" target='_blank' rel='noreferrer'><Typography>Tripto Foundation- </Typography></a>
                                <Button size="small" color='success' variant="contained">Donate Now</Button>

                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Typography variant='h1'>Menu</Typography>
                                <Typography>Beef items - </Typography> 
                                <Typography>Grocery collection - </Typography> 
                                <Typography>Discount product - </Typography> 
                                <Typography>Home -</Typography>

                            </Grid>
                            <Grid item xs={10} md={5}>
                                <Typography variant='h1'>Stay Connected</Typography>
                                <Typography>We prvide you the fresh ready to cook food items. Our cutomer is our first priority, we customize the order according to your needs </Typography> 
                                <Paper
                                    component="form"
                                    sx={{ p: '1px 2px',mt:'10px', display: 'flex', alignItems: 'center', maxWidth: 400 }}
                                    >
                                    <IconButton sx={{ p: '3px' }} aria-label="menu">
                                        <MenuIcon />
                                    </IconButton>
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Singn in for News Letter"
                                        inputProps={{ 'aria-label': 'Singn in for News Letter' }}
                                    />
                                    <IconButton type="submit" sx={{ p: '5px' }} aria-label="search">
                                        <Link to='/login'><SearchIcon /></Link>
                                    </IconButton>
                                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                    <IconButton color="primary" sx={{ p: '5px' }} aria-label="directions">
                                        <DirectionsIcon />
                                    </IconButton>
                                    </Paper>
                            </Grid>
                            <Grid textAlign='right' item xs={2} md={1} sx={{display:'flex', flexDirection:'column'}}>
                                <a href="https://www.facebook.com/triptoradhuni" target='_blank' rel='noreferrer'><FacebookIcon fontSize='large' sx={{color:"#3b5998", cursor:'pointer', m:1}}/></a>
                                <a href="https://www.facebook.com/triptoradhuni" target='_blank' rel='noreferrer'><TwitterIcon fontSize='large' sx={{color:"#00acee", cursor:'pointer', m:1}}/></a>
                                <a href="https://www.facebook.com/triptoradhuni" target='_blank' rel='noreferrer'><PinterestIcon fontSize='large' sx={{color:"#E60023", cursor:'pointer', m:1}}/></a>
                                <a href="https://www.facebook.com/triptoradhuni" target='_blank' rel='noreferrer'><InstagramIcon fontSize='large' sx={{color:" #bc2a8d", cursor:'pointer', m:1}}/></a>

                            </Grid>
                        </Grid>
                        </Box>
                    </Container>

                    <Typography variant='body2' sx={{textAlign:'center'}}>
                    © All rights reserved to Tripto Radhuni 
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