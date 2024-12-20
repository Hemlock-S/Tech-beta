import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  return (
    <>
      <div className="app min-h-screen bg-gray-50 text-gray-700 text-lg">
        <Navbar/>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/products/:categories' element={<Products/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App
