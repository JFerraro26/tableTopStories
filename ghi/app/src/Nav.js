import { NavLink } from 'react-router-dom';


function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Home</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className='nav-item dropdown'>
              <NavLink className="nav-link dropdown-toggle" id='myCreatedContent' data-bs-toggle="dropdown" to="#" role="button" aria-expanded="false">
                My Content
              </NavLink>
              <ul className="dropdown-menu dropdown-menu-dark navbar-dark" aria-labelledby="myCreatedContent">
                <li><NavLink className="dropdown-item" to="/worlds">My Worlds</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
