import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, Grid, List, ListItem, Typography } from '@mui/material';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Layout from '../Shared/Layout';
import useStyles from '../utilities/style';
import axios from 'axios';
import { Store } from '../utilities/Store';
import AOS from 'aos'
import 'aos/dist/aos.css'


const ProductDetails = () => {
    const {state, dispatch} = useContext(Store)
    const [myProducts, setmyProducts] = useState([])
    const [newProduct, setNewProduct] = useState([])
    const [relvantItem, setRelevantItem] = useState([])
    const [loding, setLoding] = useState(false)
    const {_id} = useParams()
    const navigate = useNavigate()
    
    
  
    const isMounted = useRef(true)
    useEffect(()=>{
      fetch('https://powerful-meadow-17770.herokuapp.com/products')
      .then(res => res.json())
      .then(data =>{
        if(isMounted.current){
        setmyProducts(data.products)
        console.log(myProducts)
        }
        setLoding(true)
      } )
      return () => {
        isMounted.current = false;
      }
    } ,[])

    
   useEffect(()=>{
    const ourProduct = myProducts.find((a) => a._id === _id)
    const findRelevantItem = myProducts.filter((x) => x?.category === ourProduct?.category)
    setRelevantItem(findRelevantItem)
    setNewProduct(ourProduct)
   }, [myProducts])


   useEffect(()=> {
    
   }, [myProducts])

   const productChangeHandler = (id) => {
    const clickProduct = myProducts.find((a) => a._id === id)
    setNewProduct(clickProduct)
    }

    const classes = useStyles()
   
    const addToCartHandler = async () =>{
    const {data} = await axios.get(`https://powerful-meadow-17770.herokuapp.com/products/${_id}`)  
    const existItem = state.cart.cartItems.find(x => x._id === data._id)
    const quantity = existItem? existItem.quantity + 1 : 1
    if(data.countInStock < quantity){
        window.alert('Sorry Product is out of stock');
        return
    }
    dispatch({type:'CART_ADD_ITEM', payload:{...newProduct, quantity}})
    navigate('/cart')

    }
   
    useEffect(()=>{
            AOS.init()
    }, [])

    return (
        <>
          <Layout title={newProduct?.name}>
            <Box className={classes.section} key={newProduct?._id}>
                <Link style={{textDecoration:'none'}} to='/'>
                    Back to home
                </Link>
            </Box>
            {
                loding ? <Grid container spacing={1} data-aos="fade-up">
                <Grid item md={5} xs={12}>
                    <Box sx={{maxWidth:440, maxHeight:440}}>
                    <img src={newProduct?.image} alt={newProduct?.name} width='100%' height='100%'/>
                    </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                    
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
            </Grid> : <Box sx={{ display: 'flex', justifyContent:'center', alignItems:'center'  }}>
                           <CircularProgress color='secondary' />
                        </Box>
            }
            <Typography variant='body1' color='primary'  sx={{textAlign:'center', mt:10 }}>Find more {newProduct?.category} items</Typography>
            <Box sx={{display:'flex' ,justifyContent:'center', alignItems:'center'}}>
                
                <Box sx={{mt:8, display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
                        {relvantItem?.map((product) => (
                            
                            <Card sx={{ display: 'flex', m:2, maxWidth:350 }} key={product._id} data-aos="fade-up">
                               
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