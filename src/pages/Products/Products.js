import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../utilities/Store';
import AOS from 'aos'
import 'aos/dist/aos.css'
import './Product.css'




const Products = () => {
  const [products, setProducts] = useState([])
  const [selectProduct, setSelectProduct] = useState([])
  const {state, dispatch} = useContext(Store)
  const navigate = useNavigate()

  //  pagination
  const [pageCount, setPageCount] = useState(0)
  const [page, setPage] = useState(0)
  let size = 8;
  useEffect(()=>{
    return() =>{
      fetch(`https://powerful-meadow-17770.herokuapp.com/products?page=${page}&&size=${size}`)
    .then(res => res.json())
    .then(data =>{
      setProducts(data)
      const count = data?.count
      const pageNumber = Math.ceil(count/size)
      setPageCount(pageNumber)
    } )
    }
  } ,[page])

  /* const [meatItems, setMeatItem] = useState([])
  useEffect(() =>{
   const meatItem =  products.filter((meat) => meat.category === 'Beef' )
   setMeatItem(meatItem)
  },[products]) */

  const setDifferntItem = (item) =>{
    let allItems =  products.filter((meat) => meat.category === item )
    
    setSelectProduct(allItems)
  }

  useEffect(()=>{
    setSelectProduct(products)
  },[products] )
 

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
        <>
       
        <Box data-aos='zoom-out-up'>
          <Box sx={{my:5,textAlign:'center'}}>
       
            <Button sx={{backgroundColor:'#f7f9fc', color:"#000", fontWeight:700, m:2}} onClick={()=>setDifferntItem('Fish')}>Fish</Button>
            <Button sx={{backgroundColor:'#f7f9fc', color:"#000", fontWeight:700, m:2}} onClick={()=>setDifferntItem('Beef')}>Meat</Button>
            <Button sx={{backgroundColor:'#f7f9fc', color:"#000", fontWeight:700, m:2}} onClick={()=>setDifferntItem('Cooking')}>Cooking</Button>
            <Button sx={{backgroundColor:'#f7f9fc', color:"#000", fontWeight:700, m:2}} onClick={()=>setDifferntItem('Dairy')}>Dairy</Button>
            <Button sx={{backgroundColor:'#f7f9fc', color:"#000", fontWeight:700, m:2}} onClick={()=>setDifferntItem('Beverage')}>Beverage</Button>
            <Button sx={{backgroundColor:'#f7f9fc', color:"#000", fontWeight:700, m:2}} onClick={()=>setDifferntItem('BeautyHealth')}>Beauty & Health</Button>
            <Button sx={{backgroundColor:'#f7f9fc', color:"#000", fontWeight:700, m:2}} onClick={()=>setDifferntItem('Fruits')}>Fruits</Button>
            <Button sx={{backgroundColor:'#f7f9fc', color:"#000", fontWeight:700, m:2}} onClick={()=>setDifferntItem('Vegitable')}>Vegitable</Button>
            <Button sx={{backgroundColor:'#f7f9fc', color:"#000", fontWeight:700, m:2}} onClick={()=>setDifferntItem('Others')}>Others</Button>
          
         
          </Box>
            
            
            <Grid container spacing={3}
          sx={{justifyContent:'center'}}
          >
            {selectProduct.map((product) =>(<Grid
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
          <div className="pagination">
              {
                [...Array(pageCount).keys()]
                .map(number => <Button
                className={number === page ? 'selected' : ''}
                key={number}
                onClick={()=> setPage(number)}
                >
                  {number}
                  </Button> )
              }
            </div>
        </Box>
        </>
    );
};

export default Products;