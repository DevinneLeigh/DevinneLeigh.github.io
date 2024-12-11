function BsInput(props) {
    let currencyPart
    let percentagePart

    if (props.type === "currency") {
        currencyPart = <span className="input-group-text">$</span>
    } else if (props.type === "percent") {
        percentagePart = <span className="input-group-text">%</span>
    }

    return (
        <div className="mb-3">
          <label htmlFor={props.name} className="form-label">{props.label}</label>
          <div className="input-group">
            {currencyPart}
            <input 
              value={props.value} 
              onChange={(e) => setPrincipal(e.target.value)}
              type="text" className="form-control" id={props.name} placeholder="0.00" />
            {percentagePart}
          </div>
        </div>
    );
}

export default BsInput;