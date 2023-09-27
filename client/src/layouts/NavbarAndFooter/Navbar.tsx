import { Link, NavLink } from "react-router-dom"
import { useOktaAuth } from '@okta/okta-react'
import { SpinnerLoading } from "../utils/SpinnerLoading";

export const Navbar = () => {

  const { oktaAuth, authState } = useOktaAuth();
  if (!authState) {
    return <SpinnerLoading />
  }

  const handleLogout = async () => {
    oktaAuth.signOut();
  }
  console.log(authState)

  return (
    <nav className='nav navbar-expand-lg navbar-dark main-color py-3'>
      <div className="container-fluid ">
        <div className="d-flex justify-content-between">
          <span className="navbar-brand">SpaniShelf</span>
          <button className="navbar-toggler" type='button' data-bs-toggle='collapse' data-bs-target="#navbarNavDropdown" aria-controls='navbarNavDropdown' aria-expanded='false' aria-label='Toggle navigation'>
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item me-3">
              <NavLink to="/home" className='nav-link' >Home</NavLink>
            </li>
            <li className="nav-item me-3">
              <NavLink className='nav-link' to="/search">Search books</NavLink>
            </li>
            {authState?.isAuthenticated &&
              <li className="nav-item me-3">
                <NavLink className="nav-link" to="/shelf">Shelf</NavLink>
              </li>
            }
            {authState?.isAuthenticated &&
              <li className="nav-item me-3">
                <NavLink className="nav-link" to="/fees">Pay fees</NavLink>
              </li>
            }
            {
              authState.isAuthenticated && authState.accessToken?.claims?.userType === "admin" &&
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">Admin</NavLink>
              </li>
            }
          </ul>
          <ul className="navbar-nav ms-auto">
            {!authState.isAuthenticated ?
              <li className="nav-item me-3">
                <Link to="/login" type="button" className='btn btn-outline-light'>Sign in</Link>
              </li>
              :
              <li className="nav-item m-1">
                <button type="button" className='btn btn-outline-light' onClick={handleLogout}>Log out</button>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav >
  );
}

