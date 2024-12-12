function Nav(props) {

    return (

        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand px-4 d-flex justify-content-center justify-content-md-start align-items-center w-100" href="/">
            <div>
              <img className="logo" src="/src/assets/cat-cash.png" width="150" alt="Meow Money Logo" />
            </div>
            <div>
              <h1 className="meowfont logo-text">Meow Money</h1>
            </div>
          </a>
        </nav>
        
    );
}

export default Nav;