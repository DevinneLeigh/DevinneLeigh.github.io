import Card from "./Card";

function WhyOurCalculators(props) {
    let heading = `Why Meow Money's ${props.type} Calculator is the Cat's Meow`;
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Card heading={heading}>
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
                                    <img className="cat-img img-fluid" src="/ReactProject/dist/src/assets/cat-piggy.png" alt="Cat with a piggy bank." />
                                </div>
                                <div className="col-12 col-md-8">
                                    <p className="mt-3">
                                        Planning a big purchase? Don't let it turn into a hairball of debt! Meow Money's {props.type} Calculator is the purr-fect tool to help you navigate the financial jungle. Our calculator is more than just a number cruncher; it's your personal finance guru.
                                    </p>

                                    <p>
                                        Unlike other calculators that may leave you scratching your head, Meow Money's is designed with simplicity in mind. With just a few clicks of your paw, you can quickly estimate your monthly payments and total interest costs. No more chasing your tail trying to figure out the fine print. By using our calculator, you can make informed decisions and avoid getting tangled up in a yarn ball of debt.
                                    </p>
                                    
                                </div>

                            </div>

                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default WhyOurCalculators;