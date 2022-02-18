import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";


const initilizeFirebase =()=>{
    initializeApp(firebaseConfig);
}

export default initilizeFirebase;