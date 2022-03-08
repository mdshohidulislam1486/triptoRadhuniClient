import { jsonEval } from '@firebase/util';
import { Alert, Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';

const MakeAdmin = () => {
    const [email, setEmail] = useState()
    const [addAdmin, setAddAdmin] = useState(false)
    const handleOnBlur = e =>{
        setEmail(e.target.value)
    }
    
    const handleMakeAdmin = e=> {
        const user = {email}
        
        fetch('https://powerful-meadow-17770.herokuapp.com/users/admin', {
            method:'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data=> {
            if(data.modifiedCount){
                setEmail('')
                setAddAdmin(true)
            }
        })
       
        e.preventDefault()

    }

    
    return (
       <Box sx={{display:'flex',flexDirection:'column', justifyContent:'center', alignContent:'center'}}>
            <Box sx={{width:'75%'}}>
            <Typography variant='h4' sx={{fontWeight:'600'}} >Make a new admin/moderator</Typography>
            <Typography variant='body1'>Please make sure you are 100% ready to add this person as a admin of your website, the admin can add another admin and also he will get authority to eidit and delete data form your website, he can also see all the user orders and cancell or delete order if needed</Typography>
            </Box>
            <form onSubmit={handleMakeAdmin}>
           <Box sx={{mt:5}}> 
           <TextField  label="Enter your email" type='text' 
            onBlur={handleOnBlur} />
            <br/>
            <br/>
            <Button variant='contained' type='submit'>Make A admin</Button>
           </Box>
            </form>
            {addAdmin && <Alert severity='success'>Admin Added Successfully</Alert>}
       </Box>
    );
};

export default MakeAdmin;