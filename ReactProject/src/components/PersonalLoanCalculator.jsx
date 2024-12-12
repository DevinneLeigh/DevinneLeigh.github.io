import { useState, useEffect } from 'react'
import Card from './Card';
import BsInput from './BsInput';
import catCalc from '../assets/cat-calc.png';

function PersonalLoanCalculator(props) {

    useEffect(() => {
        // when the component mounts.
        setAnswer(calculateLoan());
    }, []);
    
    const [principal, setPrincipal] = useState(100000);
    const [percentage, setPercentage] = useState(8);
    const [years, setYears] = useState(30);
    const [answer, setAnswer] = useState(0);

    function calculateLoan() {
        let r = ((percentage/100)/12);
        let n = (years*12);
        let numerator = (r*Math.pow((1+r), n));
        let denominator = (Math.pow((1+r), n)-1);
        return principal*(numerator/denominator)
    }

    function roundTo2(float) {
        return Math.round(float*100) / 100;
    }

    return (
        <div className="container">
            <div className="row">
            <div className="col-12 col-md-7">
                <Card heading="Personal Loan Calculator">

                <BsInput name="principal" label="Loan Amount" value={principal} setter={setPrincipal} type="currency" />

                <BsInput name="percentage" label="Interest Rate" value={percentage} setter={setPercentage} type="percent" />

                <BsInput name="years" label="Loan Length (Years)" value={years} setter={setYears} />

                

                
                </Card>

            </div>
            <div className="col-12 col-md-5">
                <div>
                    <Card>
                        <div className="d-flex justify-content-center align-items-center">
                            <img className="cat-img img-fluid" src={catCalc} alt="Calculator Cat" height="160px" />
                        </div>
                        <div className="">
                            <button className="my-3 w-100 btn btn-primary" 
                            onClick={() => setAnswer(calculateLoan())}>
                            Calculate
                            </button>
                        </div>

                        <h2 className="h3">
                            Monthly Payment: ${roundTo2(answer)}
                        </h2>
                    </Card>
                </div>
                


            </div>
            </div>
        </div>
    )
}

export default PersonalLoanCalculator;