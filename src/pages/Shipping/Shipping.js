import { Button, List, ListItem, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../Shared/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import useStyles from '../utilities/style';
import { Store } from '../utilities/Store';
import Cookies from 'js-cookie';
import useAuth from '../hooks/useAuth';
import CheckOutWizard from '../utilities/CheckOutWizard';

const Shipping = () => {
    
    const navigate = useNavigate()
    const {user} = useAuth()
    const {state, dispatch} = useContext(Store)
    const {
        cart: { shippingAddress },
      } = state;
      const [address, setAddress] = useState({})

      useEffect(()=>{
        fetch(`https://powerful-meadow-17770.herokuapp.com/shippingaddress/${user.email}`)
        .then(res => res.json())
        .then(data => setAddress(data))
      } ,[])


      useEffect(() =>{
        if(!user.email){
            navigate('/login')
        }
        setValue('fullName', user.name);
        setValue('email', user.email);
        setValue('phone', address?.phone);
        setValue('address', address?.address);
        setValue('city', address?.city);
        setValue('phoneNumber', address?.phone);
    }, [address])

    const { setValue, handleSubmit, reset, control, formState:{errors} } = useForm();
    
    const onSubmit = ({name, email, address, city, phone}) =>{
        dispatch({
            type:'SAVE_SHIPPING_ADDRESS',
            payload:{name, email, address, city, phone}
        })
        Cookies.set( 'shippingAddress', JSON.stringify({name, email, address, city, phone}) )
        
        navigate('/payment')
       
    };
    const classes = useStyles()
   /*  const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
      } = useForm();
      const navigate = useNavigate();
      const { state, dispatch } = useContext(Store);
      const {
        userInfo,
        cart: { shippingAddress },
      } = state;
      useEffect(() => {
        if (!user.email) {
            navigate('/login');
        }
        setValue('fullName', shippingAddress.fullName);
        setValue('address', shippingAddress.address);
        setValue('city', shippingAddress.city);
        setValue('postalCode', shippingAddress.postalCode);
        setValue('country', shippingAddress.country);
      }, []);
    
      const classes = useStyles();
      const submitHandler = (data, { fullName, address, city, postalCode, country }) => {
        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: { fullName, address, city, postalCode, country },
        });
        Cookies.set('shippingAddress', JSON.stringify({
            fullName,
            address,
            city,
            postalCode,
            country,
          }));
        axios.post('https://powerful-meadow-17770.herokuapp.com/shipping', data)
        .then(res =>{
          navigate('/payment');
        }
        
         )}; */

        
   
    return (
        <Layout>
            <CheckOutWizard activeStep={1}/>
            
            <form onSubmit={handleSubmit(onSubmit)} >
                    <List className={classes.addProduct} sx={{display:'flex', flexWrap:'wrap'}}>
                        <Typography variant='h3' sx={{my:5}}>Shipping Address</Typography>
                        <ListItem>
                            <Controller
                            name="name"
                            control={control}
                            defaultValue={user?.displayName}
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                variant="outlined"
                                fullWidth
                                id="name"
                                label="Name"
                                inputProps={{ type: 'name' }}
                                error={Boolean(errors.name)}
                                helperText={
                                    errors.name
                                    ? errors.name.type === 'minLength'
                                        ? 'Name length is more than 1'
                                        : 'Name is required'
                                    : ''
                                }
                                {...field}
                                    ></TextField>
                            )}
                            ></Controller>
                        </ListItem>
                        <ListItem>
                            <Controller
                            name="email"
                            control={control}
                            defaultValue={user.email}
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                variant="outlined"
                                fullWidth
                                id="email"
                                label="Email"
                                inputProps={{ type: 'text' }}
                                error={Boolean(errors.email)}
                                helperText={
                                    errors.name
                                    ? errors.name.type === 'minLength'
                                        ? 'Email length is more than 1'
                                        : 'Email is required'
                                    : ''
                                }
                                {...field}
                                    ></TextField>
                            )}
                            ></Controller>
                        </ListItem>
                        <ListItem>
                            <Controller
                            name="phone"
                            control={control}
                            defaultValue=''
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                variant="outlined"
                                fullWidth
                                id="phone"
                                label="Phone Number"
                                inputProps={{ type: 'number' }}
                                error={Boolean(errors.phone)}
                                helperText={
                                    errors.phone
                                    ? errors.phone.type === 'minLength'
                                        ? 'Phone length is more than 1'
                                        : 'Phone number is required'
                                    : ''
                                }
                                {...field}
                                    ></TextField>
                            )}
                            ></Controller>
                        </ListItem>
                        <ListItem>
                            <Controller
                            name="address"
                            control={control}
                            defaultValue=''
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                variant="outlined"
                                fullWidth
                                id="address"
                                label="House, Road & Area"
                                inputProps={{ type: 'text' }}
                                error={Boolean(errors.address)}
                                helperText={
                                    errors.address
                                    ? errors.address.type === 'minLength'
                                        ? 'Address length is more than 1'
                                        : 'Address is required'
                                    : ''
                                }
                                {...field}
                                    ></TextField>
                            )}
                            ></Controller>
                        </ListItem>
                        <ListItem>
                            <Controller
                            name="city"
                            control={control}
                            defaultValue=''
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                variant="outlined"
                                fullWidth
                                id="city"
                                label="City & Zipcode"
                                inputProps={{ type: 'text' }}
                                error={Boolean(errors.city)}
                                helperText={
                                    errors.city
                                    ? errors.city.type === 'minLength'
                                        ? 'City & Zipcode length is more than 1'
                                        : 'City & Zipcode is required'
                                    : ''
                                }
                                {...field}
                                    ></TextField>
                            )}
                            ></Controller>
                        </ListItem>
                       <ListItem> <Button backgroundcolor='secondary' type='submit' variant="contained">Submit</Button></ListItem>
                    </List>
                </form>
               {/*  <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
                <Typography component="h1" variant="h1">
                Shipping Address
                </Typography>
                <List>
                <ListItem>
                    <Controller
                    name="fullName"
                    control={control}
                    defaultValue={user.name}
                    rules={{
                        required: true,
                        minLength: 2,
                    }}
                    render={({ field }) => (
                        <TextField
                        variant="outlined"
                        fullWidth
                        id="fullName"
                        label="Full Name"
                        error={Boolean(errors.fullName)}
                        helperText={
                            errors.fullName
                            ? errors.fullName.type === 'minLength'
                                ? 'Full Name length is more than 1'
                                : 'Full Name is required'
                            : ''
                        }
                        {...field}
                        ></TextField>
                    )}
                    ></Controller>
                </ListItem>
                <ListItem>
                    <Controller
                    name="address"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: true,
                        minLength: 2,
                    }}
                    render={({ field }) => (
                        <TextField
                        variant="outlined"
                        fullWidth
                        id="address"
                        label="Address"
                        error={Boolean(errors.address)}
                        helperText={
                            errors.address
                            ? errors.address.type === 'minLength'
                                ? 'Address length is more than 1'
                                : 'Address is required'
                            : ''
                        }
                        {...field}
                        ></TextField>
                    )}
                    ></Controller>
                </ListItem>
                <ListItem>
                    <Controller
                    name="city"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: true,
                        minLength: 2,
                    }}
                    render={({ field }) => (
                        <TextField
                        variant="outlined"
                        fullWidth
                        id="city"
                        label="City"
                        error={Boolean(errors.city)}
                        helperText={
                            errors.city
                            ? errors.city.type === 'minLength'
                                ? 'City length is more than 1'
                                : 'City is required'
                            : ''
                        }
                        {...field}
                        ></TextField>
                    )}
                    ></Controller>
                </ListItem>
                <ListItem>
                    <Controller
                    name="postalCode"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: true,
                        minLength: 2,
                    }}
                    render={({ field }) => (
                        <TextField
                        variant="outlined"
                        fullWidth
                        id="postalCode"
                        label="Postal Code"
                        error={Boolean(errors.postalCode)}
                        helperText={
                            errors.postalCode
                            ? errors.postalCode.type === 'minLength'
                                ? 'Postal Code length is more than 1'
                                : 'Postal Code is required'
                            : ''
                        }
                        {...field}
                        ></TextField>
                    )}
                    ></Controller>
                </ListItem>
                <ListItem>
                    <Controller
                    name="country"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: true,
                        minLength: 2,
                    }}
                    render={({ field }) => (
                        <TextField
                        variant="outlined"
                        fullWidth
                        id="country"
                        label="Country"
                        error={Boolean(errors.country)}
                        helperText={
                            errors.country
                            ? errors.country.type === 'minLength'
                                ? 'Country length is more than 1'
                                : 'Country is required'
                            : ''
                        }
                        {...field}
                        ></TextField>
                    )}
                    ></Controller>
                </ListItem>
                <ListItem>
                    <Button variant="contained" type="submit" fullWidth color="primary">
                    Continue
                    </Button>
                </ListItem>
                </List>
            </form> */}
        </Layout>
    );
};

export default Shipping;