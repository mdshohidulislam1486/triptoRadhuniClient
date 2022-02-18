import { Box, Button, Card, Grid, List, ListItem, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Shared/Layout';
import { Store } from '../utilities/Store';

const CartScreen = () => {
    const {state, dispatch} = useContext(Store)
    const  { cart: {cartItems}} = state;
    

    const updateCartHandler = async (item, quantity) => {
        const {data} = await axios.get(`http://localhost:5000/products/${item._id}`)
        if (data.countInStock < quantity) {
          window.alert('Sorry. Product is out of stock');
          return;
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
      };
      const removeItemHandler =(item) => {
          dispatch({type:'CART_REMOVE_ITEM', payload: item})
      }
    return (
        <Layout title='Shopping Cart'>
        <Typography component='h1' variant='h1'>Shopping Cart</Typography>
        {cartItems?.length === 0 ? (
            <Box>Cart is empty. <Link to='/'>Go back to home </Link> </Box>)
            :
            <Grid container spacing={1}>
                <Grid item md={9} xs={12}>
                   <TableContainer>
                        <Table> 
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell align='right'>Quentity</TableCell>
                                    <TableCell align='right'>Price </TableCell>
                                    <TableCell align='right'>Action</TableCell>
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
                                            <Select    value={item.quantity}
                                                onChange={(e) =>
                                                    updateCartHandler(item, e.target.value)
                                                }
                                                >
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <MenuItem key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                    </MenuItem>
                                                ))}
                                             </Select>
                                        </TableCell>
                                        <TableCell align='right'>
                                           <Typography>$ {item.price}</Typography>
                                        </TableCell>
                                        <TableCell align='right'>
                                           <Button variant='contained' color='secondary'
                                           onClick={() => removeItemHandler(item)}
                                           >X</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                   </TableContainer>
                </Grid>
                <Grid item md={3} xs={12}>
                   <Card>
                       <List>
                            <ListItem variant='h2'>
                                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{''} items)
                                    : $ {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                            </ListItem>
                            <ListItem>
                                <Button fullWidth variant='contained' color='primary'> Check Out</Button>
                            </ListItem>
                       </List>

                   </Card>
                </Grid>

            </Grid>
         }

        </Layout>
    );
};

export default CartScreen;