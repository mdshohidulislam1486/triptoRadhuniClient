import { Button, List, ListItem, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import Layout from '../Shared/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import useStyles from '../utilities/style';
import { Store } from '../utilities/Store';
import Cookies from 'js-cookie';
import useAuth from '../hooks/useAuth';

const Shipping = () => {

    const {user} = useAuth()
    const {state, dispatch} = useContext(Store)
    const {
        cart: { shippingAddress },
      } = state;

      useEffect(() =>{
        setValue('fullName', user.name);
        setValue('email', user.email);
        setValue('address', shippingAddress.address);
        setValue('city', shippingAddress.city);
        setValue('phoneNumber', shippingAddress.phone);
    }, [])

    const { setValue, handleSubmit, reset, control, formState:{errors} } = useForm();
    const onSubmit = data =>{
        axios.post('http://localhost:5000/shipping', data)
        .then(res =>{
            dispatch({
                type:'SAVE_SHIPPING_ADDRESS',
                payload:{data}
            })
            Cookies.set( 'shippingAddress', JSON.stringify({data}) )
            if(res.data.insertedId){
                alert('Shipping Address addeded')
            }
        })
        reset()

    };
    const classes = useStyles()

   
    return (
        <Layout>
            <Typography>This is the shipping page </Typography>
            <form onSubmit={handleSubmit(onSubmit)} >
                    <List className={classes.addProduct} sx={{display:'flex', flexWrap:'wrap'}}>
                        <ListItem>
                            <Controller
                            name="name"
                            control={control}
                            defaultValue={user.displayName}
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
                            defaultValue=""
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
        </Layout>
    );
};

export default Shipping;