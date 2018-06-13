import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteUserThunk, makeAdminThunk } from '../store'

const style = {
    component: {
      width: '15rem',
      marginBottom: 10
    },
    link: {
      paddingTop: '.375rem'
    }
  }

export class UserCard extends Component{

    deleteUser = () => {
        let confirmName = !!this.props.user.firstName ? this.props.user.fullName : this.props.user.email
        if (window.confirm(`Are you sure you want to delete ${confirmName}?`)){
          this.props.deleteAUser(this.props.user.id)
        }
    }

    adminStatus = () => {
        const data = this.props.user.userType === 'user' ? {userType: 'administrator'} : {userType: 'user'}
        const id = this.props.user.id
        this.props.makeAdmin(id, data)
    }
    render(){
        let title = this.props.user.firstName ? this.props.user.fullName : this.props.user.email
        let email = title !== this.props.user.email ?  this.props.user.email : null
        //User name logic for Oauth Login
        // let userName = this.props.user.userName ? this.props.user.userName : this.props.user.email.slice(0, 2) + this.props.user.id
        return (

        <div className="card user-card" style={style.component}>

        <img className="card-img-top" src={this.props.user.photo} />

          <div className="card-body">

            <h5>
              <Link to={`/user/${this.props.user.id}`}>{title}</Link>
            </h5>

            <p className="card-text">ID: {this.props.user.id}</p>

            { title !== this.props.user.email &&
              <p className="card-text">Email: {email}</p>
            }

            <p className="card-text">User Type: {this.props.user.userType}</p>

            <div className="row">

              <div className="col col-sm">

              <button
                onClick={this.adminStatus}
                type="button"
                className="btn btn-outline-secondary btn-sm float-left">
                Change User Type
              </button>

              </div>

              <div className="col col-sm">

              <button
                onClick={this.deleteUser}
                type="button"
                className="btn btn-outline-secondary btn-sm float-left">
                Delete User
              </button>

              </div>

            </div>

          </div>
        </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        deleteAUser: (id) => dispatch(deleteUserThunk(id)),
        makeAdmin: (id, data) => dispatch(makeAdminThunk(id, data))
    }
}

export default connect(null, mapDispatchToProps)(UserCard)
