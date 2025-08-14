

import './App.css'
import Shopdetailbanner from './Shopbanner'
import Shopdetailcard from './Shopdetailcard'
import Shopdetailsslider from './shopdetailsslider'
import Shopreview from './Shopreview'

function App() {
 
  return (
    <>
      <Shopdetailbanner/>
      <Shopdetailsslider/>
      <Shopreview/>
      <div className="shop-list-card mt-5">
        <div className="container">
          <div className="row">
            <h2 className='fs-1 fw-bold my-5'>Related Products</h2>
            <div className="col-4">
              <Shopdetailcard foodimage="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/item-1.jpg" foodname="Shrimp foods" foodprice="$15.00"/>
            </div>
            <div className="col-4">
              <Shopdetailcard foodimage="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/item-2.jpg" foodname="French mayos" foodprice="$65.00"/>
            </div>
            <div className="col-4">
              <Shopdetailcard foodimage="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/item-3.jpg" foodname="Cheese pizza" foodprice="$45.00"/>
            </div>    
          </div>
        </div>  
      </div>
    </>
  )
}

export default App
