import { Button, Card, CircularProgress, Grid, List, ListItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Layout from '../Shared/Layout';
import CheckOutWizard from '../utilities/CheckOutWizard';
import { getError } from '../utilities/erro';
import { Store } from '../utilities/Store';
import useStyles from '../utilities/style';

const PlaceOrder = () => {
    const {user} = useAuth()
    const navigate = useNavigate()
    const {state, dispatch} = useContext(Store)
    const  { cart: {cartItems, shippingAddress, paymentMethod}} = state;
    const {id} = useParams()

    const classes = useStyles()
    const round2 = num => Math.round(num*100 + Number.EPSILON) /100; 
    const  itemsPrice = round2(cartItems.reduce((a, c) => a + c.price * c.quantity, 0))
    const shippingPrice = itemsPrice> 200 ? 0 : 15
    const taxPrice= round2(itemsPrice * 0.15);
    const totalPrice = round2(itemsPrice + shippingPrice  + taxPrice)
    useEffect(() =>{
        if(!paymentMethod){
            navigate('/payment')
        }
        if(cartItems.length === 0 ){
            navigate('/cart')
        }
    })
    const {closeSnackbar, enqueueSnackbar} = useSnackbar()
    const [loading, setLoading] = useState(false)
    const placeOrderHandler = async() =>{
        
        closeSnackbar();
        try{
            setLoading(true)
            const {data} = await axios.post('https://powerful-meadow-17770.herokuapp.com/placeOrder', {
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
            }
            
        
            )
            dispatch({type:'CART_CLEAR'});
            Cookies.remove('cartItems');
            setLoading(true)
            navigate(`/orderDetails/${data?.insertedId}`)
            console.log(data)
        }catch(err){
          setLoading(false)
          enqueueSnackbar(getError(err), {variant:'error'})  
        }
    }
  
    return (
        <Layout>
            <CheckOutWizard activeStep={3}></CheckOutWizard>
             <Typography component='h1' variant='h1'>Place Order</Typography>
            
            <Grid container spacing={1}>
                
                <Grid item md={9} xs={12}>
                <Card className={classes?.section}>
                    <List>
                        <ListItem>
                            <Typography component='h2' variant='h2'>Shipping Address</Typography>
                        </ListItem>
                        <ListItem> {shippingAddress.name},  {shippingAddress.phone},  {shippingAddress.address}, {shippingAddress.city}</ListItem>
                    </List>
                </Card>
                <Card className={classes?.section}>
                    <List>
                        <ListItem>
                            <Typography component='h2' variant='h2'>Payment Method</Typography>
                        </ListItem>
                        <ListItem> {paymentMethod}</ListItem>
                    </List>
                </Card>
                <Card className={classes?.section}>
                    <List>
                        <ListItem>
                            <Typography component='h2' variant='h2'>Order Items</Typography>
                        </ListItem>
                        <ListItem>
                        <TableContainer>
                        <Table> 
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell align='right'>Quentity</TableCell>
                                    <TableCell align='right'>Price </TableCell>
                                   
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartItems.map((item) =>(
                                    <TableRow key= {item._id}>
                                        <TableCell>
                                            <a href={`/productDetails/${item._id}`}>
                                                <img src={item.image} alt={item.name} width={50} height={50} />
                                            </a>
                                        </TableCell>
                                        <TableCell >
                                            <a href={`/productDetails/${item._id}`} style={{textDecoration:"none"}}>
                                               <Typography color='secondary'>
                                                   {item.name}
                                               </Typography>
                                            </a>
                                        </TableCell>
                                        <TableCell  align='right'>
                                          <Typography>{item.quantity}</Typography> 
                                        </TableCell>
                                        <TableCell align='right'>
                                           <Typography>$ {item.price}</Typography>
                                        </TableCell>
                                        
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                   </TableContainer>

                        </ListItem>
                    </List>
                  
                   </Card>
                </Grid>
                <Grid item md={3} xs={12}>
                   <Card  className={classes?.section}>
                       <List>
                            <ListItem>
                                   <Typography variant='h2' component='h2'>Order Summary</Typography>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography> Items: </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align='right'> ${itemsPrice} </Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography> Tax: </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography  align='right' > ${taxPrice} </Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography> Shipping: </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography  align='right'> ${shippingPrice} </Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography> <strong>Total:</strong> </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography  align='right'> <strong>${totalPrice}</strong> </Typography>
                                    </Grid>
                                </Grid>
                            </ListItem> 
                            <ListItem>
                                <Link  to={`productDetails/${id}`}></Link>
                                <Button onClick={placeOrderHandler}  fullWidth variant='contained' color='primary'> Place Order</Button>
                            </ListItem>
                            {loading  && <ListItem>
                                <CircularProgress></CircularProgress>
                                </ListItem>}
                       </List>

                   </Card>
                </Grid>

            </Grid> 
        </Layout>
    );
};

export default PlaceOrder;