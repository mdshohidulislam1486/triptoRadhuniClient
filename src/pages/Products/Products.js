import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Grid, IconButton, InputBase, Pagination, Paper, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, {useState, useEffect, useContext, useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../utilities/Store';
import AOS from 'aos'
import 'aos/dist/aos.css'
import './Product.css'

import SearchIcon from '@mui/icons-material/Search';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import useAuth from '../hooks/useAuth'




const Products = () => {
  const [myProducts, setMyProducts] = useState([])
  const [selectProduct, setSelectProduct] = useState([])
  const {state, dispatch} = useContext(Store)
  const navigate = useNavigate()
  const [pageCount, setPageCount] = useState(0)
  const [page, setPage] = useState(0)
  const [isLoding, setIsLoding] = useState(false)
  const [nodataFound, setNodataFound] = useState(false)
  const {admin}= useAuth()
  

  //  pagination
 
  let size = 8;

  useEffect(()=>{
    fetch(`https://powerful-meadow-17770.herokuapp.com/products?page=${page}&&size=${size}`)
    .then(res => res.json())
    .then((data) =>{

        setMyProducts(data.products)
        const count  = data.count
        const pageNumber = Math.ceil(count / size )
        setPageCount(pageNumber)
        setIsLoding(true)
    })
  
  } ,[page, myProducts])
  



 /*  fetch('http://localhost:5000/products')
    .then(res => res.json())
    .then(data =>{
    setMyProducts(data) 
  })  */
  

  

  /* const [meatItems, setMeatItem] = useState([])
  useEffect(() =>{
   const meatItem =  products.filter((meat) => meat.category === 'Beef' )
   setMeatItem(meatItem)
  },[products]) */

  useEffect(()=>{
    fetch(`https://powerful-meadow-17770.herokuapp.com/products`)
    .then(res => res.json())
    .then(data => setSelectProduct(data.products))
  },[myProducts])

  const setDifferntItem = (item) =>{
    let allItems =  selectProduct.filter((a) => a.category === item )
    setMyProducts(allItems)
  }

 useEffect(()=>{
    setSelectProduct(myProducts)
  },[myProducts] )
 

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

  const [searchText, setSearchText] = useState(false)
  const handleSearch = event  =>{
    const searchText = event.target.value
    setSearchText(searchText)
    if(!searchText){
      setNodataFound(true)
      return
    }
    const matchedProducts = selectProduct.filter(search => search.name.toLowerCase().includes(searchText.toLowerCase()))
    setMyProducts(matchedProducts)
    console.log(matchedProducts.length)
  }

  useEffect(()=> {
    setNodataFound(false)
  }, [searchText])


    return (
        <>
        <Box sx={{display:'flex', justifyContent:'center'}}>
          <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', maxWidth: 400 }}
            >
              <InputBase
                onChange={handleSearch}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Google Maps"
                inputProps={{ 'aria-label': 'search google maps' }}
              />
              <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
              </IconButton>
            </Paper>
        </Box>
       
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
            
            
            {
              nodataFound ? <Typography>Nothing is found </Typography> : <Box>
              {
                isLoding ? <Grid container spacing={3}
                sx={{justifyContent:'center'}}
                >
              {myProducts.map((product) =>(<Grid
                item
                
                key={product?._id}
                data-aos='zoom-out-up'
                >
                  <Card sx={{width:205}}>
                  {
                    admin ? <CardHeader
                      
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                   
                  /> : '' 
                  }
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
              )).slice(0, 50)}
            </Grid> : <Box sx={{ display: 'flex', justifyContent:'center', alignItems:'center' }}>
                            <CircularProgress color='secondary' />
                        </Box>
              }
            
              <Box className="pagination">
              {
              [...Array(pageCount).keys()]
              .map(number => <Button
              key={number}
              className={number === page ? 'selected' : ''}
              onClick={()=> setPage(number)}>
                {number + 1} 
              </Button> 
              )
              }
              </Box>
            </Box>
            }
          {/* <Stack spacing={2}>
              <Pagination key={number}
               count={number}
               onClick={()=> setPage(number + 1)}
              color="secondary" />
             </Stack> */}
        </Box>
        </>
    );
};

export default Products;