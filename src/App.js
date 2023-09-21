import './App.css';
import {Container} from "react-bootstrap";
import {Route , Routes} from "react-router-dom";
import Store from './Components/Store';
import Navbar from './Components/Navbar';
import ShopingCartProvider from './Context/ShopingCartContext';

function App() {
  return (

  <ShopingCartProvider>
  <Navbar/>
  <Container className='mb-4'>
  <Routes>
    <Route path="/Store" element={<Store/>}/>
  </Routes>
  </Container>
  </ShopingCartProvider>
  
)}

export default App;
