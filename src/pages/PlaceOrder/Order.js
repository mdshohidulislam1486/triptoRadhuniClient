import { Button, Card, CircularProgress, Grid, List, ListItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Layout from '../Shared/Layout';
import CheckOutWizard from '../utilities/CheckOutWizard';
import { getError } from '../utilities/erro';
import { Store } from '../utilities/Store';
import useStyles from '../utilities/style';


function reducer(state, action){
    switch (action.type){
        case 'FETCH_REQUEST' :
          return {...state, loding: true, error:'', order:{}};
        case 'FETCH_SUCCESS' :
            return {...state, loding: false, order: action.payload, error:''}
        case 'FETCH_FAIL' :
            return {...state, loding: false, error: action.payload, order:{}};
          // eslint-disable-next-line no-unused-expressions
          default: state;
    }
}

const Order = () => {

    
    

    const [cartItems, setCartItems] = useState(null)
    const {_id} = useParams()
    console.log(_id)

    useEffect(()=> {
        let isMounted = true
        
        fetch(`http://localhost:5000/orderslist/${_id}`)
        .then(res => res.json())
        .then(data => setInterval(() =>{
            if(isMounted){
                setCartItems(data)
            }
        }, 5000) )

       
        return (() =>{
            isMounted = false
        })
        
    }, [])
    console.log(cartItems)
    const {state} = useContext(Store)
    const classes = useStyles()

    const [{loding, error, order}, dispatch] = useReducer(reducer, {
        loding: true,
        order:{},
        error:'',
    })
   

    return ( 
        <Layout>
            <CheckOutWizard activeStep={4}></CheckOutWizard>
             <Typography component='h1' variant='h1'>Place Order</Typography>
            
            <Grid container spacing={1}>
                
                <Grid item md={9} xs={12}>
                <Card className={classes?.section}>
                    <List>
                        <ListItem>
                            <Typography component='h2' variant='h2'>Shipping Address</Typography>
                        </ListItem>
                        <ListItem> {cartItems?.shippingAddress?.name},  {cartItems?.shippingAddress?.phone},  {cartItems?.shippingAddress?.address}, {cartItems?.shippingAddress?.city}</ListItem>
                    </List>
                </Card>
                <Card className={classes?.section}>
                    <List>
                        <ListItem>
                            <Typography component='h2' variant='h2'>Payment Method</Typography>
                        </ListItem>
                        <ListItem> </ListItem>
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
                                {cartItems?.map((item) =>(
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
                                        <Typography align='right'> ${cartItems?.itemsPrice} </Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography> Tax: </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography  align='right' > ${cartItems?.taxPrice} </Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography> Shipping: </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography  align='right'> ${cartItems?.shippingPrice} </Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography> <strong>Total:</strong> </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography  align='right'> <strong>${cartItems?.totalPrice}</strong> </Typography>
                                    </Grid>
                                </Grid>
                            </ListItem> 
                            
                       </List>

                   </Card>
                </Grid>

            </Grid> 

        </Layout>
    );
};

export default Order;