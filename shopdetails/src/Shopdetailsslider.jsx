import { FaRegHeart } from "react-icons/fa";

function Shopdetailsslider()   {
    return (
        <div className="shop-detail mt-5">
            <div className="Container">
                <div className="row">
                    <div className="col-lg-6 col-sm-12 col-xs-12">
                        <div className="shop-detail-slider">
                            <div className="col-md-6">
                                <div className="our-story-imgs">
                                    <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/pizza-img-5.png" alt="" className="stort-img1" style={{marginLeft: "100px"}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-xs-12">
                        <div className="shop-detail-content p-3">
                            <h2 className="fs-1 mb-0" style={{fontWeight: "600"}}>Shrimp Pizza</h2>
                            <div className="row">
                                <ul className="list-unstyled d-flex align-items-center my-4">
                                    <li>
                                        <h2 className="fs-2 fw-bold text-danger mb-0">$35.00</h2>
                                    </li>
                                    <li>
                                        <a href="#" className="text-decoration-none text-warning mx-5 fs-3">★★★★★</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-decoration-none text-secondary fs-5">8 Reviews</a>
                                    </li>
                                </ul>
                            </div>
                            <p className="text-secondary fs-5" style={{maxWidth: "600px", lineHeight: "35px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                                euismod, nisi vel consectetur interdum, nisl nisi consectetur nisi, euismod
                                nisi vel consectetur nisi.</p>
                            <p className="text-secondary fs-5 my-4" style={{maxWidth: "600px", lineHeight: "35px"}}>Lorem ipsum dolor sit amet,colur consectetur omni adipisicing elit, sed do eiusmod tempor incididunt labore et magna aliqua</p>
                            <p><span className="fw-semibold fs-4">Category : </span>
                            <a href="#" className="text-decoration-none text-secondary fs-5">Chicken</a> , <a href="#" className="text-decoration-none text-secondary fs-5">Launch</a> , <a href="#" className="text-decoration-none text-secondary fs-5"> Pizza</a> , <a href="#" className="text-decoration-none text-secondary fs-5">Burger</a>
                            </p>
                            <p><span className="fw-semibold fs-4">Tags : </span>
                            <a href="#" className="text-decoration-none text-secondary fs-5">Healthy</a> , <a href="#" className="text-decoration-none text-secondary fs-5">Organic</a> , <a href="#" className="text-decoration-none text-secondary fs-5"> Chicken</a> , <a href="#" className="text-decoration-none text-secondary fs-5">Sauce</a>
                            </p>
                            <div className="d-flex align-items-center my-4">
                                <button className="btn btn-warning rounded-pill px-4 py-2 me-3 fw-semibold fs-5" style={{color: "white"}}>Add to cart</button>
                                <button className="btn btn-outline-secondary rounded-circle  px-3 py-2 fw-semibold fs-5"><FaRegHeart /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shopdetailsslider;