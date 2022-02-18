import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from '../../hooks/useAuth';





const PriavateRoute = ({children,...rest}) => {

    const {user, isLoading} =useAuth()
    if(isLoading){
        return   <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                user.email ? (
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
};

export default PriavateRoute;