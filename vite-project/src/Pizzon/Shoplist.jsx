import { Dropdown } from "react-bootstrap";


function Shoplist() {
    return (
        <div className="shop-list">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="shop-list-header d-flex justify-content-between align-items-center">
                            <div className="shop-list-right">
                                <a href="#" className="btn rounded-pill" style={{ color: "white" }}>FILTER</a>
                            </div>
                            <div className="shop-list-left  d-flex p-sm-5">
                                    <p className="mb-0 fs-4 fw-bold d-none d-md-block">Showing all 9 results</p>
                                <div className="Dropdown ms-5">
                                    <Dropdown className="dropdown">
                                        <Dropdown.Toggle  className="border-0 rounded-pill px-4 py-2 dropdown-toggle" id="dropdown-basic" style={{ color: "white" , backgroundColor: "#ffb700" }}>
                                                Dropdown Button
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shoplist;