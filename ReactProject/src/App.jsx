import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <div className="card">
        <div className="card-body">

          <h1 className="h2">Personal Loan Calculator</h1>

          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Principal</label>
            <div className="input-group">
              <span class="input-group-text">$</span>
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="0.00" />
            </div>
          </div>

          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Percentage</label>
            <div className="input-group">
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="0.00" />
              <span class="input-group-text">%</span>
            </div>
          </div>

          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Years</label>
            <div className="input-group">
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="0" />
            </div>
          </div>

          <button className="mb-3 w-100 btn btn-primary" onClick={() => setCount((count) => count + 1)}>
            Calculate {count}
          </button>

          <h2 className="h3">
            Your Results: 
          </h2>

          </div>
      </div>

    </>
  )
}

export default App
