import './App.css'
import Nav from './components/Nav';
import CopyrightFooter from './components/CopyrightFooter';
import PersonalLoanCalculator from './components/PersonalLoanCalculator';
import WhyOurCalculators from './components/WhyOurCalculators';

function App() {

  return (
    <>

      <Nav />

      <PersonalLoanCalculator />

      <WhyOurCalculators type="Personal Loan" />

      <CopyrightFooter />

      

    </>
  )
}

export default App
