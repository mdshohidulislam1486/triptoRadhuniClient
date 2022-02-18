import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import ProductDetails from './pages/Products/ProductDetails';
import StoreProvider from './pages/utilities/Store';
import About from '../src/pages/About/About'
import AddProducts from './pages/AddData/AddProducts';
import AuthProvider from './pages/context/AuthProvider';
import Login from './pages/Login/Login/Login';
import { SnackbarProvider } from 'notistack';
import Register from './pages/Login/Register/Register';
import CartScreen from './pages/Cart/Cart';

function App() {
  /* useEffect(()=>{
    const jssStyles = document.querySelector('#jss-server-side')
    if(jssStyles){
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, []) */
  return (
    <SnackbarProvider anchorOrigin={{vertical:'top', horizontal:'center'}}>
    <StoreProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/" element={<Home />}/>
            <Route path='/addproduct' element={<AddProducts />} />
            <Route path='/about' element={<About></About>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/cart' element={<CartScreen/>} />
            <Route path='/register' element={<Register/>} />
            
            <Route path='/productDetails/:_id' element={<ProductDetails />} />
            <Route path="*" element={<Home />}/>    
          </Routes>
        </BrowserRouter>
     </AuthProvider>
     </StoreProvider>
     </SnackbarProvider>
 
  );
}

export default App;
