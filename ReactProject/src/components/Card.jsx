function Card(props) {
    return (
        <div className="card">
            <div className="card-body">
                <div className="h3 card-title">{props.heading}</div>
                {props.children}
            </div>
        </div>
    );
}

export default Card;