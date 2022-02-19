import React from 'react';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { Redirect, Route } from 'react-router';
import useAuth from '../../hooks/useAuth';


const AdminPrivateRoute = ({children,...rest}) => {
    const {user, isLoading} =useAuth()
    if(isLoading){
        return   <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    }
    return (
        <div>
            <Route
            {...rest}
            render={({ location }) =>
                user.email.role === 'admin' ? (
                children
                ) : (
                <Redirect
                    to={{
                    pathname: "/login",
                    state: { from: location }
                    }}
                />
                )
            }
    />
    );
        </div>
    );
};

export default AdminPrivateRoute;