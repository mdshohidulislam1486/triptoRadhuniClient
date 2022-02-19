import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Navigate, useLocation,} from 'react-router-dom';

import useAuth from '../../hooks/useAuth';





const PriavateRoute = ({children}) => {
    const location = useLocation()

    const {user, isLoading} =useAuth()
    if(isLoading){
        return   <Box sx={{ display: 'flex', justifyContent:'center', alignItems:'center' }}>
        <CircularProgress />
      </Box>
    }

    return (      user?.email ?  children: <Navigate to="/login" replace state={{from:location}}/>
                    )      
};

export default PriavateRoute;