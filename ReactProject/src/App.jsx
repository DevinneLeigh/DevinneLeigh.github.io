import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card';
import BsInput from './components/BsInput';

function App() {

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
    <>

      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
        
          <img src="/src/assets/cat-cash.png" width="150" className="d-inline-block align-top" alt="" />
          <h1 class="meowfont">Meow Money</h1>
        </a>
      </nav>

      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <Card heading="Personal Loan Calculator">

              <BsInput name="principal" label="Loan Amount" value={principal} type="currency" />

              <BsInput name="percentage" label="Interest Rate" value={percentage} type="percent" />

              <BsInput name="years" label="Loan Length (Years)" value={years} />

              

              
            </Card>

          </div>
          <div className="col-12 col-md-6">
            <div className="row">
              <div className="col-6">
                <button className="mb-3 w-100 btn btn-primary" 
                  onClick={() => setAnswer(calculateLoan())}>
                  Calculate
                </button>

              </div>
              <div className="col-6">
                <img src="./src/assets/cat-calc.png" alt="Calculator Cat" height="160px" />

              
                
              </div>
            </div>
            

            <h2 className="h3">
                Monthly Payment: ${roundTo2(answer)}
              </h2>

          </div>
        </div>
      </div>

      

    </>
  )
}

export default App
