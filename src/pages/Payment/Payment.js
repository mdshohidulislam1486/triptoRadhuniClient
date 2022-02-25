import { ClassNames } from '@emotion/react';
import { Button, FormControl, FormControlLabel, List, ListItem, Radio, RadioGroup, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Shared/Layout';
import CheckOutWizard from '../utilities/CheckOutWizard';
import { Store } from '../utilities/Store';
import useStyles from '../utilities/style';
import {useSnackbar} from 'notistack'

const Payment = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const classes = useStyles();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('');
    const { state, dispatch } = useContext(Store);
    const {
      cart: { shippingAddress },
    } = state;
    useEffect(() => {
      if (!shippingAddress.address) {
        /* navigate('/shipping'); */
      } else {
        setPaymentMethod(Cookies.get('paymentMethod') || '');
      }
    }, []);
    const submitHandler = (e) => {
      closeSnackbar();
      e.preventDefault();
      if (!paymentMethod) {
        enqueueSnackbar('Payment method is required', { variant: 'error' });
      } else {
        dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
        Cookies.set('paymentMethod', paymentMethod);
        navigate('/placeorder');
      }
    }
    return (
        <Layout title='paymentMethod'>
            <CheckOutWizard activeStep={2}/>
            <form className={classes.form} onSubmit={submitHandler}>
                <Typography component='h1' variant='h1'>Payment Method</Typography>
                <List>
                    <ListItem>
                        <FormControl component='fieldset'>
                            <RadioGroup aria-label='Payment Method' name="paymentMethod" value={paymentMethod}
                            onChange={(e) =>setPaymentMethod(e.target.value) }
                            >
                                <FormControlLabel  
                                    label='PayPal' 
                                    value='PayPal' 
                                    control={<Radio/>}>
                                </FormControlLabel>
                                <FormControlLabel  
                                    label='Stripe' 
                                    value='Stripe' 
                                    control={<Radio/>}>
                                </FormControlLabel>
                                <FormControlLabel  
                                    label='Cash' 
                                    value='Cash' 
                                    control={<Radio/>}>
                                </FormControlLabel>
                            </RadioGroup>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <Button fullWidth type='submit' variant='contained' color='primary'> Continue</Button>
                    </ListItem>
                    <ListItem>
                        <Button onClick={() => navigate('/shipping')} fullWidth type='submit' variant='contained' color='secondary'> Back</Button>
                    </ListItem>
                </List>
            </form> 

        </Layout>
    );
};

export default Payment;