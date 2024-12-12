function Section1(props) {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
                            <div className="top-layer col-md-5 p-lg-5 mx-auto my-5">
                                <h1 className="display-4 fw-normal">Catchy headline</h1>
                                <p className="lead fw-normal">And an even wittier subheading to boot. Jumpstart your marketing efforts with this example based on Apple’s marketing pages.</p>
                                <a className="btn btn-outline-secondary" href="#">Coming soon</a>
                            </div>
                            <div className="bottom-layer product-device shadow-sm d-none d-md-block"></div>
                            <div className="bottom-layer product-device product-device-2 shadow-sm d-none d-md-block"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Section1;