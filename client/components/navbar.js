import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { ProductSearch } from './products'

const Navbar = ({ handleClick, isLoggedIn, userId, cart, user }) => {

  return (

  <nav className="navbar navbar-expand-sm navbar-dark">

    <a className="navbar-brand" href="/">Shaheed's Steeds</a>

      {
        isLoggedIn ? (
        <ul className="navbar-nav ml-auto">
           {/* The navbar will show these links after you log in */}
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orders">Orders</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to={`/cart/${userId}`}>Cart{cart.totalQuant}</Link>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleClick}>Logout</a>
            </li>

            { user.userType === 'administrator' &&
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Admin</a>
                <div className="dropdown-menu">
                  <Link className="nav-link" to="/addProduct">Add Product</Link>
                  <Link className="nav-link" to="/addCategory">Add Category</Link>
                  <Link className="nav-link" to="/userList">User Management</Link>
                </div>
              </li>
            }

        </ul>
        ) : (
          <ul className="navbar-nav ml-auto">
            {/* The navbar will show these links before you log in */}
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            {
              (!isLoggedIn) ?
              <li className="nav-item">
                <Link className="nav-link" to={`/cart/${window.localStorage.tempUserId}`}>Cart{cart.totalQuant}</Link>
              </li> : ''
            }
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">Sign Up</Link>
            </li>
          </ul>
        )
      }

      <ProductSearch />
  </nav>

  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    userId: state.user.id,
    cart: state.cart.cart,
    user: state.user
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

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
