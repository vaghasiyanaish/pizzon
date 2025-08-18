import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Shopbanner from './Pizzon/Shop';
import Shoplist from './Pizzon/Shoplist';
import Shoplistcard from './Pizzon/Shoplistcard';
import Pagination from 'react-bootstrap/Pagination';
import Shoppagination from './Pizzon/Shoppagination';
import Footer from './Pizzon/Footer';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Shopbanner/>
      <Shoplist />
      <div className="shop-list-card mt-5">
        <div className="container">
          <div className="row">
            <div className=" col-lg-4 col-md-6 col-sm-12">
              <Shoplistcard foodimage="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/item-1.jpg" foodname="Shrimp foods" foodprice="$15.00"/>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <Shoplistcard foodimage="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/item-2.jpg" foodname="French mayos" foodprice="$65.00"/>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <Shoplistcard foodimage="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/item-3.jpg" foodname="Cheese pizza" foodprice="$45.00"/>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <Shoplistcard foodimage="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/item-4.jpg" foodname="Russian rolls" foodprice="$25.00" />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <Shoplistcard foodimage="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/item-5.jpg" foodname="Seafood burger" foodprice="$75.00" /> 
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <Shoplistcard foodimage="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/item-6.jpg" foodname="Sandwich soup" foodprice="$55.00" /> 
            </div>
          </div>
        </div>  
      </div>
     <Shoppagination/>
     <Footer/>
    </>
  )
  
}

export default App
