function Shoppagination() {
    return (
        <div className="shop-pagination mt-5"> 
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <ul className="pagination justify-content-center text-decoration-none" style={{marginBottom: "80px"}}>
                            <li>
                                <a href="#" className="text-decoration-none border-0 rounded-circle px-3 py-2 fw-bold text-white bg-warning">1</a>
                            </li>
                            <li>
                                <a href="#" className="text-decoration-none mx-2 border-0 rounded-circle px-3 py-2 fw-bold text-white bg-black">2</a>
                            </li>
                            <li>
                                <a href="#" className="text-decoration-none border-0 rounded-circle px-3 py-2 fw-bold text-white bg-black">3</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Shoppagination;

