

function Shoplistcard({ foodname, foodimage, foodprice }) {
    return (
        <div className="shop-list-card-item border rounded-4 p-3 mb-5 p-sm-5">
            <img src={foodimage} alt={foodname} className="img-fluid" />
            <div className="mt-2 d-flex align-items-center justify-content-between">
                <a href="#" className="text-decoration-none text-dark">
                    <h4 className="mb-0 fw-bold fs-3">{foodname}</h4>
                </a>
                <p className="mb-0 fw-semibold fs-4" style={{ color: "red" }}>{foodprice}</p>
            </div>
            <p className="my-2 text-warning fs-4" >★ ★ ★ ★ ★</p>
            <p style={{"maxWidth": "400px"}} className="fs-5 text-secondary">All the Lorem Ipsum generators on to Internet tend to repeat</p>
            <button className="btn btn-warning rounded-pill px-4 py-2 my-2 fw-semibold fs-5" style={{ color: "white" }}>Order Now</button>
        </div>
    );
}

export default Shoplistcard;