import { useContext } from "react";
import { NavContext } from "../context/NavProvider";



const useNav =()=>{
    const navUse = useContext(NavContext);
    return navUse
}

export default useNav;