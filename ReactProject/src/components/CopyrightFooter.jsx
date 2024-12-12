function CopyrightFooter(props) {

    let year = new Date().getFullYear();
    let rightsHolder = "Meow Money";

    return (

        <div className="container-fluid bg-light mt-5 p-4">
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

export default CopyrightFooter;