import { Alert, Button, CircularProgress, Container, Grid, List, ListItem, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import {  NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Layout from '../../Shared/Layout';



const Login = () => {


    const [loaginData, setLogingData] = useState({})
    const {user, loginUser, isLoading, authError,  signInwithGoogle} = useAuth()
    const location = useLocation()
    const history  = useNavigate()
    
    const handleOnChange = e =>{
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData={...loaginData}
        newLoginData[field] =value;
        setLogingData(newLoginData)


    }
   
    const handleLoginSubmit =e=>{
        loginUser(loaginData.email, loaginData.password, location, history)
        if(user.location)
        e.preventDefault()
    }
    const handleGoogleSignIn=()=>{
        signInwithGoogle(location, history)
    }
    
    return (
        <Layout>
            <Container sx={{mt:5, minHeight:"100vh"}}>
            <Grid container spacing={2}> 
                <Grid item xs={12} md={6} sx={{mt:5}}>
                    <Typography variant={'body1'} gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={handleLoginSubmit}>
                   

                    <List>
                        <ListItem>
                            <TextField sx={{width:"75%"}} id="standard-basic" onBlur={handleOnChange} name='email' label="Your Email" variant="standard" />
                        </ListItem>

                        <ListItem>
                            <TextField sx={{width:"75%"}} name='password' onBlur={handleOnChange}  type="password" id="standard-basic" label="Your Password" variant="standard" /> 
                        
                        </ListItem>
                        <ListItem>
                        <Button type='submit' sx={{bgcolor:"success.main", width:"75%", my:2}} variant='contained'>Login</Button>
                        </ListItem>
                        <ListItem>
                            <NavLink style={{textDecoration:'none'}} to='/register'><Button variant="text" > New User? Plese register</Button></NavLink>
                        </ListItem>
                        {isLoading && <CircularProgress /> }
                        {user?.email && <Alert severity="success">Successfully loged in</Alert>}
                        {authError && <Alert severity="error">{authError}</Alert>}

                    </List>
                    </form>
                   <List>
                       <ListItem>
                        <Button  onClick={handleGoogleSignIn} variant='contained'>Google Sign In</Button>
                       </ListItem>
                   </List>

                </Grid>
                <Grid item xs={12} md={6}>
                    <img  style={{width:"100%"}} src="" alt="" />
                </Grid>

            </Grid>
            
        </Container>
        </Layout>
       
    );
};

export default Login;