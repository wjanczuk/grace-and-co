import React from 'react'
import {connect} from 'react-redux'
import {loadUserProfile} from '../store/user'

class UserProfile extends React.Component {
  componentDidMount() {
    this.props.loadUserProfile(this.props.match.params.id)
  }

  render() {
    const {singleUser} = this.props
    console.log('singleUser-->', singleUser)

    return (
      <div id="single-user-container">
        {singleUser === undefined ? (
          <h1>User Profile Loading...</h1>
        ) : (
          <div>
            <h1>Profile | {singleUser.email}</h1>
            <h4>User Profile</h4>
            <p>email: {singleUser.email}</p>
            <p>first name: {singleUser.firstName}</p>
            <p>last name: {singleUser.lastName}</p>
            <h4>Billing Address</h4>
            <p>address: {singleUser.billingAddress}</p>
            <p>address: {singleUser.billingAddress2}</p>
            <p>
              city: {singleUser.billingCity} | state: {singleUser.state}
            </p>
            <p>ZIP: {singleUser.billingZIP}</p>
            <h4>Order History</h4>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleUser: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUserProfile: id => dispatch(loadUserProfile(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
