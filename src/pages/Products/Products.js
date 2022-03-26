import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../utilities/Store';
import AOS from 'aos'
import 'aos/dist/aos.css'



const Products = () => {
  const [products, setProducts] = useState([])
  const {state, dispatch} = useContext(Store)
  const navigate = useNavigate()
  useEffect(()=>{
    fetch('https://powerful-meadow-17770.herokuapp.com/products')
    .then(res => res.json())
    .then(data => setProducts(data))
  } ,[])

  /* const [meatItems, setMeatItem] = useState([])
  useEffect(() =>{
   const meatItem =  products.filter((meat) => meat.category === 'Beef' )
   setMeatItem(meatItem)
  },[products]) */

  const getMeatItem = () =>{
    const meatItem =  products.filter((meat) => meat.category === 'Beef' )
    setProducts(meatItem)
  }
 

  const addToCartHandler = async (product) =>{
    const existItem = state.cart.cartItems.find(x => x._id === product._id)
    const quantity = existItem? existItem.quantity + 1 : 1
    const {data} = await axios.get(`https://powerful-meadow-17770.herokuapp.com/products/${product._id}`)
    if(data.countInStock < quantity){
      window.alert('Sorry Product is out of stock');
      return
   }
    dispatch({type:'CART_ADD_ITEM', payload:{...product, quantity}})
    navigate('/cart')

    }
    useEffect(()=>{
      AOS.init()
  }, [])

    return (
        <Box data-aos='zoom-out-up'>
            <Typography component='h2' variant='h2'>Products</Typography>
            <Grid container spacing={3}
          sx={{justifyContent:'center'}}
          >
            {products?.map((product) =>(<Grid
              item
              sm={6}
              md={4}
              lg={3}
              key={product?.name}
              data-aos='zoom-out-up'
              >
                <Card >
                <Link style={{textDecoration:"none"}} to={`productDetails/${product._id}`} >
                  <CardActionArea>
                    <CardMedia component='img' image= {product.image}
                    title={product?.name}
                    >
                    </CardMedia>
                    <CardContent>
                      <Typography color='secondary'>
                        {product?.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                
                  </Link>
                  <CardActions>
                    <Typography>
                      ${product?.price}
                    </Typography>
                    <Button color='primary'
                    onClick={() => addToCartHandler(product)}
                    >Add to cart</Button>
                  </CardActions>
                  
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
    );
};

export default Products;