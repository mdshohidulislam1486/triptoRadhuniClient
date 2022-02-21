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
        
        fetch('http://localhost:5000/users/admin', {
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
       <Box>
            <Typography>Make a new admin/moderator</Typography>
            <form onSubmit={handleMakeAdmin}>
            <TextField  label="Enter your email" type='text' 
            onBlur={handleOnBlur} />
            <Button variant='contained' type='submit'>Make A admin</Button>
            </form>
            {addAdmin && <Alert severity='success'>Admin Added Successfully</Alert>}
       </Box>
    );
};

export default MakeAdmin;