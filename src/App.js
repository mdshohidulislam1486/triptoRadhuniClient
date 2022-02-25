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
import PriavateRoute from './pages/Login/PrivateRoute/PrivateRoute';
import DashboardHome from './pages/Dashboard/DashboardHome';
import MakeAdmin from './pages/Dashboard/MakeAdmin';
import ProductList from './pages/Dashboard/ProductList';
import AdminPrivateRoute from './pages/Login/PrivateRoute/AdminPrivateRoute';
import Shipping from './pages/Shipping/Shipping';
import Payment from './pages/Payment/Payment';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';

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
            <Route path='/dashboard' element={<AdminPrivateRoute><DashboardHome/></AdminPrivateRoute>}>
              <Route path='makeadmin' element={<MakeAdmin/>}/>
              <Route path='productlist' element={<ProductList/>}/>
            </Route>
            <Route path='/shipping' element={<PriavateRoute><Shipping/></PriavateRoute>}></Route>
            <Route path='/placeorder' element={<PriavateRoute><PlaceOrder/></PriavateRoute>}></Route>
            <Route path='/payment' element={<PriavateRoute><Payment/></PriavateRoute>}></Route>
            <Route path='/register' element={<Register/>} />
            <Route path='/productDetails/:_id' element={<ProductDetails />} />    
          </Routes>
        </BrowserRouter>
        </AuthProvider>
        </StoreProvider>
     
     </SnackbarProvider>
 
  );
}

export default App;
