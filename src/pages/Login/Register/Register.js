import React, { useState } from 'react';
import { Button, CircularProgress, Container, Grid, TextField, Typography, Alert } from '@mui/material';
import {  NavLink, useNavigate,  } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Layout from '../../Shared/Layout';



const Register = () => {
    const [loaginData, setLogingData] = useState({})
    const history  = useNavigate()

    const {user, registerUser, isLoading, authError} = useAuth()

    const handleOnBlur = e =>{
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData={...loaginData}
        newLoginData[field] =value;
        setLogingData(newLoginData)
        console.log(loaginData)

    }
    const handleLoginSubmit =e=>{
        if(loaginData.password !== loaginData.password2){
            alert('Your password did not match ')
            return
        }
        registerUser(loaginData.email, loaginData.password, loaginData.name, history )
        e.preventDefault()
    }
    return (
        <Layout>
            <Container sx={{mt:5}}>
                <Grid container spacing={2}> 
                    <Grid item xs={12} md={6} sx={{mt:5}}>
                        <Typography variant={'body1'} gutterBottom>
                            Register
                        </Typography>
                        {!isLoading && <form onSubmit={handleLoginSubmit}>
                        <TextField sx={{width:"75%"}} id="standard-basic" onBlur={handleOnBlur} name='name' type='text' label="Your Name" variant="standard" required />
                        <TextField sx={{width:"75%"}} id="standard-basic" onBlur={handleOnBlur} name='email' label="Your Email" variant="standard" type="email" />
                        <TextField sx={{width:"75%"}} name='password' onBlur={handleOnBlur}  type="password" id="standard-basic" label="Your Password" variant="standard" />
                        <TextField sx={{width:"75%"}} name='password2' onBlur={handleOnBlur}  type="password" id="standard-basic" label="Confirm Password" variant="standard" />
                        <Button item type='submit' sx={{bgcolor:"success.main", width:"75%", my:2}} variant='contained'>Register</Button>
                        <NavLink style={{textDecoration:'none'}} to='/login'><Button variant="text" style={{textDecoration:'none'}}> Already Registered? Plese Login</Button></NavLink>
                        </form>}
                        {isLoading && <CircularProgress /> }
                        {user?.email && <Alert severity="success">You have successfully registered</Alert>}
                        {authError && <Alert severity="error">{authError}</Alert>}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img  style={{width:"100%"}} src="" alt="" />
                    </Grid>

                </Grid>
            </Container>
        </Layout>
    );
};

export default Register;