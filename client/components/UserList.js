import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllUsersThunk } from '../store/'
import UserCard from './UserCard'

export class UserList extends Component {


    componentDidMount(){
        this.props.displayUsers()
    }
    render() {
        return (
            this.props.userList.length ?
            <div className="container">
                <h2 className="text-center">User List</h2>
                <div>
                    <div className="row">
                        {
                            this.props.userList.map(element =>{
                                return (
                                    <div key={element.id} className="col-md-auto">
                                        <UserCard user={element} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>: null
        )
    }
}


const mapStateToProps = state =>{
    console.log('state in users list: ', state)
    return {userList: state.userManagementReducer.allUsers}
}

const mapDispatchToProps = dispatch =>{
    return {displayUsers: () => dispatch(getAllUsersThunk())}
}


export default connect(mapStateToProps, mapDispatchToProps)(UserList)

