import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div className="inner">
    <header className="site-header">
      <div className="wrapper site-header__wrapper">
        <div className="site-header__middle">
          <nav className="nav">
            <ul className="nav__wrapper">
              {isLoggedIn ? (
                <div>
                  {/* The navbar will show these links after you log in */}
                  <li className="nav__item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="nav__item">
                    <Link to="/products">Earrings</Link>
                  </li>
                  <li className="nav__item">
                    <Link to="/cart">
                      <i className="fas fa-shopping-cart" />
                    </Link>
                  </li>
                  <li className="nav__item">
                    <Link to="/profile/">Profile</Link>
                  </li>
                  <li className="nav__item">
                    <a href="#" onClick={handleClick}>
                      Logout
                    </a>
                  </li>

                  {isAdmin && (
                    <div>
                      {/* The navbar will show these links if you are an admin */}
                      <li className="nav__item">
                        <Link to="/admin/users">Users Admin</Link>
                      </li>
                      <li className="nav__item">
                        <Link to="/admin/products">Products Admin</Link>
                      </li>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {/* The navbar will show these links before you log in */}
                  <li className="nav__item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="nav__item">
                    <Link to="/products">Earrings</Link>
                  </li>
                  <li className="nav__item">
                    <Link to="/cart">
                      <i className="fas fa-shopping-cart" />
                    </Link>
                  </li>
                  <li className="nav__item">
                    <Link to="/login">Login</Link>
                  </li>
                  <li className="nav__item">
                    <Link to="/signup">Sign Up</Link>
                  </li>
                </div>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  </div>
)

//container
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

//prop types
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
