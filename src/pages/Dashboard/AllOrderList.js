import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
// web.cjs is required for IE11 support
import { animated, useSpring} from 'react-spring'
import { List, ListItem, Tab } from '@mui/material';

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
    const [ordersList, setOrdrsList] = useState([])


    useEffect(()=>{
      fetch('http://localhost:5000/orderslist')
      .then(res => res.json())
      .then(data => setOrdrsList(data))
    }, [])

    // Modal 
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  


    return (
        <div>
          <Typography>This is the  All Order list </Typography>
            <Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Phone</strong></TableCell>
                  <TableCell><strong>Shipping Address</strong></TableCell>
                  <TableCell><strong>Product Details</strong></TableCell>
                  <TableCell><strong>Order Id</strong></TableCell> 
                  <TableCell><strong>Ordre Date</strong></TableCell> 
                  <TableCell><strong>Tax/Shipping/Price</strong></TableCell>
                  <TableCell><strong>Total Price</strong></TableCell>
                  <TableCell><strong>Confirmation</strong></TableCell>
                  <TableCell><strong>Shipped At</strong></TableCell>
                  <TableCell><strong>Delivered At</strong></TableCell>
                    
                  </TableRow>
                </TableHead>

               {ordersList.map((orderList) =>  <TableBody key={orderList._id}>
                  <TableRow>
                    <TableCell>{orderList?.shippingAddress?.name}</TableCell> 
                    <TableCell>{orderList?.shippingAddress?.phone}</TableCell> 
                    <TableCell>{orderList?.shippingAddress?.address} {orderList?.shippingAddress?.city} </TableCell> 
                    <TableCell sx={{cursor:'pointer', color:'#0000FF'}} onClick={handleOpen}>Product details</TableCell>
                  </TableRow>
                </TableBody>)}
              </Table>
            </TableContainer>
            </Box>
            <div>
               {ordersList.map((orderList) =>  <Modal
                  key={orderList._id}
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
                  <Fade in={open}>
                    <Box sx={style}>
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
                           {orderList.orderItems.map((newRow) =>
                           <TableBody  key={newRow?.name}>
                             <TableRow>
                              <TableCell>{newRow?.name}</TableCell>
                              <TableCell><img width={20} src={newRow?.image} alt={newRow?.name} /></TableCell>
                              <TableCell>{newRow?.price}</TableCell>
                              <TableCell>{newRow?.quantity}</TableCell>
                            </TableRow>
                          </TableBody>
                             )}
                           
                         </Table>
                       </TableContainer>
                      </Box>
                    </Box>
                  </Fade>
                </Modal>)}
            </div>
        </div>
    );
};

export default AllOrderList;