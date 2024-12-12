function Footer(props) {

    let year = new Date().getFullYear();
    let rightsHolder = "Pink Moth";

    return (

        <div className="container-fluid bg-dark text-light mt-5 p-4">
            <div className="row">
                <footer className="copyright-footer">
                    <div className="col-12">
                        &copy; Copyright { year } { rightsHolder }
                    </div>
                </footer>
            </div>
        </div>
        
    );
}

export default Footer;