import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Pagination, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../utilities/Store';
import AOS from 'aos'
import 'aos/dist/aos.css'
import './Product.css'




const Products = () => {
  const [myProducts, setMyProducts] = useState([])
  const [selectProduct, setSelectProduct] = useState([])
  const {state, dispatch} = useContext(Store)
  const navigate = useNavigate()

  //  pagination
 
/*   let size = 2; */
  useEffect(()=>{
      fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data =>{
      setMyProducts(data) 
    } )
  } ,[])

  /* const [meatItems, setMeatItem] = useState([])
  useEffect(() =>{
   const meatItem =  products.filter((meat) => meat.category === 'Beef' )
   setMeatItem(meatItem)
  },[products]) */

/*   const setDifferntItem = (item) =>{
    let allItems =  products.filter((meat) => meat.category === item )
    
    setSelectProduct(allItems)
  }
 */
 /*  useEffect(()=>{
    setSelectProduct(products)
  },[selectProduct] ) */
 

  const addToCartHandler = async (product) =>{
    const existItem = state.cart.cartItems.find(x => x._id === product._id)
    const quantity = existItem? existItem.quantity + 1 : 1
    const {data} = await axios.get(`http://localhost:5000/products/${product._id}`)
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
        <>
       
        <Box data-aos='zoom-out-up'>
         {/*  <Box sx={{my:5,textAlign:'center'}}>
       
            <Button sx={{backgroundColor:'#f7f9fc', color:"#000", fontWeight:700, m:2}} onClick={()=>setDifferntItem('Fish')}>Fish</Button>
            <Button sx={{backgroundColor:'#f7f9fc', color:"#000", fontWeight:700, m:2}} onClick={()=>setDifferntItem('Beef')}>Meat</Button>
            <Button sx={{backgroundColor:'#f7f9fc', color:"#000", fontWeight:700, m:2}} onClick={()=>setDifferntItem('Cooking')}>Cooking</Button>
            <Button sx={{backgroundColor:'#f7f9fc', color:"#000", fontWeight:700, m:2}} onClick={()=>setDifferntItem('Dairy')}>Dairy</Button>
            <Button sx={{backgroundColor:'#f7f9fc', color:"#000", fontWeight:700, m:2}} onClick={()=>setDifferntItem('Beverage')}>Beverage</Button>
            <Button sx={{backgroundColor:'#f7f9fc', color:"#000", fontWeight:700, m:2}} onClick={()=>setDifferntItem('BeautyHealth')}>Beauty & Health</Button>
            <Button sx={{backgroundColor:'#f7f9fc', color:"#000", fontWeight:700, m:2}} onClick={()=>setDifferntItem('Fruits')}>Fruits</Button>
            <Button sx={{backgroundColor:'#f7f9fc', color:"#000", fontWeight:700, m:2}} onClick={()=>setDifferntItem('Vegitable')}>Vegitable</Button>
            <Button sx={{backgroundColor:'#f7f9fc', color:"#000", fontWeight:700, m:2}} onClick={()=>setDifferntItem('Others')}>Others</Button>
          
         
          </Box> */}
            
            
            <Grid container spacing={3}
          sx={{justifyContent:'center'}}
          >
            {myProducts.map((product) =>(<Grid
              item
              sm={6}
              md={4}
              lg={3}
              key={product?._id}
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
          <div className="pagination">
              {
                /* [...Array(pageCount).keys()]
                .map(number => <Stack spacing={2}
                className={number === page ? 'selected' : ''}
                key={number}
                onClick={()=> setPage(number)}
                >
                  <Pagination count={10} color="secondary" />
                  </Stack> ) */
              } 
             
            </div>
        </Box>
        </>
    );
};

export default Products;