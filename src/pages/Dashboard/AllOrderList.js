/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
// web.cjs is required for IE11 support
import { animated, useSpring} from 'react-spring'
import { TableRow, Typography } from '@mui/material';

import AOS from 'aos'
import 'aos/dist/aos.css'


    const Fade = React.forwardRef(function Fade(props, ref) {
      const { in: open, children, onEnter, onExited, ...other } = props;
      const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
          if (open && onEnter) {
            onEnter();
          }
        },
        onRest: () => {
          if (!open && onExited) {
            onExited();
          }
        },
      });
      useEffect(()=>{
        AOS.init()
    }, [])
      return (
        <animated.div ref={ref} style={style} {...other}>
          {children}
        </animated.div>
      );
    });

    Fade.propTypes = {
      children: PropTypes.element,
      in: PropTypes.bool.isRequired,
      onEnter: PropTypes.func,
      onExited: PropTypes.func,
    };

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };



const AllOrderList = () => {
    const [ordersList, setOrdrsList] = useState([]) // all orders
    const [newProduct, setNewProduct] =useState([]) // this is for orderdetap with image
    
  
    


    useEffect(()=>{
      fetch('https://powerful-meadow-17770.herokuapp.com/orderslist')
      .then(res => res.json())
      .then(data => setOrdrsList(data))
    }, [])

    // Modal 
    const [open, setOpen] = React.useState(false);

  

    const handleOpen = (id) =>{
    const newId = ordersList.find((a) => a._id === id)
    setNewProduct(newId)
      setOpen(true);
    } 
    const handleClose = () => setOpen(false);

    
    //cnfirmaing order shipping and delivered at
    const [newConfirmId, setNewConfirmId] = useState({})

    const [myBool, setMyBool] = useState(false)
    
    /* useEffect(()=>{
       const myConrimf = newConfirmId.confirmed = myBool
        setAgainCon(myConrimf)
    }, [newConfirmId, myBool]) */

    
    const handleConfirm = (id)=> {
      let confirmPost = confirm('Do you want to change the confirm status')
      if(confirmPost){
        const clickedId = ordersList.find((a) => a._id === id)
      setMyBool(clickedId.confirmed?  false : true)
      clickedId.confirmed = myBool
      setNewConfirmId(clickedId, 1000)
      const url =   `https://powerful-meadow-17770.herokuapp.com/orderslist/${id}`
      
      fetch(url, {
        method:'PUT',
        headers:{
          'content-type':'application/json'
        },
        body: JSON.stringify(newConfirmId)
      }) 
      .then(res => res.json())
      .then(data => {
       
      })
      .catch(error => console.log(error))
      }else{
        return
      }
      
    }
   
    const handelShipping = (id)=> {
      
      const clickedId = ordersList.find((a) => a._id === id)
      // eslint-disable-next-line no-restricted-globals
      let confirmPost = confirm('Do you want to change the shipping status')
      if(confirmPost){
        setMyBool(clickedId.shippedAt?  false : true)
      clickedId.shippedAt = myBool
      setNewConfirmId(clickedId, 1000)
      const url =   `https://powerful-meadow-17770.herokuapp.com/orderslist/${id}`
      
      fetch(url, {
        method:'PUT',
        headers:{
          'content-type':'application/json'
        },
        body: JSON.stringify(newConfirmId)
      }) 
      .then(res => res.json())
      .then(data => {
       
      })
      .catch(error => console.log(error))

      } else{
        return
      }
      
    }
    const handelDeliver = (id)=> {
      
      const clickedId = ordersList.find((a) => a._id === id)
      // eslint-disable-next-line no-restricted-globals
      let confirmPost = confirm('Do you want to change the deliver status, the product will be removed from the list if you delivered the order')
      if(confirmPost){
        setMyBool(clickedId.deliveredAt?  false : true)
      clickedId.deliveredAt = myBool
      setNewConfirmId(clickedId, 1000)
      const url =   `https://powerful-meadow-17770.herokuapp.com/orderslist/${id}`
      
      fetch(url, {
        method:'PUT',
        headers:{
          'content-type':'application/json'
        },
        body: JSON.stringify(newConfirmId)
      }) 
      .then(res => res.json())
      .then(data => {
       
      })
      .catch(error => console.log(error))

      } else{
        return
      }
      
    }
    return (
        <div>
          <Typography>This is the  All Order list </Typography>
            <Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow data-aos="zoom-in-down">
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Phone</strong></TableCell>
                  <TableCell><strong>Shipping Address</strong></TableCell>
                  <TableCell><strong>Product Details</strong></TableCell>
                  <TableCell><strong>Order Id</strong></TableCell> 
                  <TableCell><strong>Ordre Date</strong></TableCell> 
                  <TableCell><strong>Tax/Shipping/Price</strong></TableCell>
                  <TableCell><strong>Total Price</strong></TableCell>
                  <TableCell><strong>Confirmed</strong></TableCell>
                  <TableCell><strong>Shipped </strong></TableCell>
                  <TableCell><strong>Delivered </strong></TableCell>
                    
                  </TableRow>
                </TableHead>

               {ordersList.map((orderList) =>  <TableBody key={orderList._id}>
                  <TableRow data-aos="zoom-in-down">
                    <TableCell>{orderList?.shippingAddress?.name}</TableCell> 
                    <TableCell>{orderList?.shippingAddress?.phone}</TableCell> 
                    <TableCell>{orderList?.shippingAddress?.address} {orderList?.shippingAddress?.city} </TableCell> 
                    <TableCell sx={{cursor:'pointer', color:'#0000FF'}} onClick={()=>handleOpen(orderList._id)}>Product details</TableCell>
                    <TableCell>{orderList?._id}</TableCell> 
                    <TableCell>{new Date(orderList?.createdAt).toLocaleString()}</TableCell> 
                    <TableCell>$ {orderList?.taxPrice} & $ {orderList?.shippingPrice? orderList?.shippingPrice : 0} & ${orderList.itemsPrice}</TableCell> 
                    <TableCell color='primary'><strong>$ {orderList?.totalPrice}</strong></TableCell> 
                    <TableCell ><Button onClick={()=>handleConfirm(orderList._id)} variant='contained'>{orderList.confirmed?  'Yes' :'No'}</Button></TableCell> 
                    <TableCell ><Button color='secondary' onClick={()=>handelShipping(orderList._id)} variant='contained'>{orderList.shippedAt?  'Yes' :'No'}</Button></TableCell> 
                    <TableCell ><Button color='primary' onClick={()=>handelDeliver(orderList._id)} variant='contained'>{orderList.deliveredAt?  'Yes' :'No'}</Button></TableCell> 

                </TableRow>
                </TableBody>)}
              </Table>
            </TableContainer>
            </Box>
            <div>
          
                <Modal
                
                  aria-labelledby="spring-modal-title"
                  aria-describedby="spring-modal-description"
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                 
                  <Fade in={open} >
                    <Box sx={style} >
                      <Typography id="spring-modal-title" variant="h6" component="h2">
                        Please find the Details of the product need to Delivered
                      </Typography>
                      <Box id="spring-modal-description" sx={{ mt: 2 }}>
                       <TableContainer>
                         <Table>
                           <TableHead>
                             <TableRow>
                                <TableCell>Product Name</TableCell>
                                 <TableCell>Img</TableCell>
                                 <TableCell>Price</TableCell>
                                 <TableCell>Quantity</TableCell>
                             </TableRow>
                           </TableHead>
                           <TableBody>
                            
                             {newProduct.orderItems?.map((a) => <TableRow key={a._id}>
                              <TableCell>{a?.name}</TableCell>
                              <TableCell><img width={30} src={a.image} alt={a.name} /></TableCell>
                              <TableCell>{a.price}</TableCell>
                              <TableCell>{a.quantity}</TableCell>
                            </TableRow>)}
                         
                           </TableBody>
                         </Table>
                       </TableContainer>
                      </Box>
                    </Box>
                   
                  </Fade>
                </Modal>
       
            </div>
        </div>
    );
};

export default AllOrderList;