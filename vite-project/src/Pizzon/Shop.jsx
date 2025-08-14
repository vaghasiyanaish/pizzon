

function Shopbanner() {
    return (
        <div className="shop-banner">
            <div className="row">
                <div className="col-6">
                    <div className="shop-banner-left text-align-left">
                        <h1>Shop list</h1>
                        <p style={{ maxWidth: "600px" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                </div>
                <div className="col-6 pe-0">
                    <div className="shop-banner-right position-relative">
                        <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/onion.png" className="shop-image-1" />
                        <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/banner-leaf.png" className="shop-image-2" />
                        <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/tamato.png"
                            className="shop-image-3" />
                        <h3>
                            <a href="#">Home</a><span className="mx-3">/</span><span style={{ color: "red" }}>Shop List</span>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shopbanner;