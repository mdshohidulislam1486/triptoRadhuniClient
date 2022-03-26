import React, { createContext } from 'react';
import Products from '../Products/Products';


export const NavContext = createContext(null)


const NavProvider = ({children})  => {

const allContexts = Products()

    return (
        <NavContext.Provider value={allContexts}>
            {children}
        </NavContext.Provider>
    );
};

export default NavProvider;