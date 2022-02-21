import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, List, ListItem, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Layout from '../Shared/Layout';
import useStyles from '../utilities/style';
import axios from 'axios';
import { Store } from '../utilities/Store';


const ProductDetails = () => {
    const {state, dispatch} = useContext(Store)
    const [products, setProducts] = useState([])
    const [newProduct, setNewProduct] = useState([])
    const [relvantItem, setRelevantItem] = useState([])
    const {_id} = useParams()
    const navigate = useNavigate()
    
    
  
    
    useEffect(()=>{
      fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
    } ,[])


   useEffect(()=>{
    const ourProduct = products.find((a) => a._id === _id)
    const findRelevantItem = products.filter((x) => x?.category === ourProduct?.category)
    setRelevantItem(findRelevantItem)
    setNewProduct(ourProduct)
   }, [products])


   useEffect(()=> {
    
   }, [products])

   const productChangeHandler = (id) => {
    const clickProduct = products.find((a) => a._id === id)
    setNewProduct(clickProduct)
    }

    const classes = useStyles()
   
    const addToCartHandler = async () =>{
    const {data} = await axios.get(`http://localhost:5000/products/${_id}`)  
    const existItem = state.cart.cartItems.find(x => x._id === data._id)
    const quantity = existItem? existItem.quantity + 1 : 1
    if(data.countInStock < quantity){
        window.alert('Sorry Product is out of stock');
        return
    }
    dispatch({type:'CART_ADD_ITEM', payload:{...newProduct, quantity}})
    navigate('/cart')

    }

   
    return (
        <>
          <Layout title={newProduct?.name}>
            <Box className={classes.section} key={newProduct?._id}>
                <Link style={{textDecoration:'none'}} to='/'>
                    Back to home
                </Link>
            </Box>
            <Grid container spacing={1}>
                <Grid item md={6} xs={12}>
                    <img src={newProduct?.image} alt={newProduct?.name} width={440} height={440}/>
                </Grid>
                <Grid item md={3} xs={12}>
                    
                    <List>
                        <ListItem><Typography component='h1'variant='h1' >Name: {newProduct?.name}  </Typography></ListItem>
                        <ListItem><Typography>Type: {newProduct?.type} </Typography></ListItem>
                        <ListItem> <Typography>Raging:  {newProduct?.rating} Stars ({newProduct?.numReviews} reviews) </Typography></ListItem>
                        <ListItem> <Typography>Description:  {newProduct?.description}</Typography></ListItem>
                    </List>
                
                </Grid>
                <Grid item md={3} xs={12}>
                    <Card>
                    <List>
                        <ListItem>
                            <Grid container >
                                <Grid item  xs={6}> <Typography>Price: </Typography></Grid>
                                <Grid item  xs={6}> <Typography>$ {newProduct?.price}</Typography></Grid>
                            </Grid>
                        </ListItem>
                        <ListItem>
                            <Grid container >
                                <Grid item  xs={6}> <Typography>Status: </Typography></Grid>
                                <Grid item  xs={6}> <Typography> {newProduct?.countInStock > 0? 'In  Stock' :'Unavailable' }</Typography></Grid>
                            </Grid>
                        </ListItem>
                       <ListItem><Button type='button' fullWidth variant='contained' color='primary'
                       onClick={addToCartHandler}
                       >Add to cart</Button></ListItem>
                    </List>
                    </Card>
                </Grid>
            </Grid>
            <Typography variant='h1' component='h1' sx={{textAlign:'center', mt:10 }}>Find more {newProduct?.category} items</Typography>
            <Box sx={{display:'flex' ,justifyContent:'center', alignItems:'center'}}>
                
                <Box sx={{mt:8, display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
                        {relvantItem?.map((product) => (
                            
                            <Card sx={{ display: 'flex', m:2 }}  key={product.key}>
                               
                               <CardActionArea onClick={()=>productChangeHandler(product._id)}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="div" variant="h5">
                                        {product.name}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                       {product.description}
                                        </Typography>
                                    </CardContent>
                                </Box>
                                </CardActionArea>
                            
                                <CardMedia
                                    component="img"
                                    sx={{ width: 151 }}
                                    image={product.image}
                                    alt="Live from space album cover"
                                    />
                             </Card>
                        )).slice(0, 4)}
                </Box>
            </Box>
          </Layout>
        </>
    );
};

export default ProductDetails;