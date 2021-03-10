import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'

class UserProfile extends React.Component {
  componentDidMount() {
    this.props.loadUserProfile()
  }

  render() {
    const {singleUser} = this.props

    return (
      <div id="single-user-container">
        {singleUser === undefined ? (
          <h1>User Profile Loading...</h1>
        ) : (
          <div>
            <h3>Profile | {singleUser.email}</h3>
            <h4>User Profile</h4>
            <table>
              <tbody>
                <tr>
                  <th>Email:</th>
                  <td>{singleUser.email}</td>
                </tr>
                <tr>
                  <th>First Name:</th>
                  <td>
                    {singleUser.firstName
                      ? singleUser.firstName
                      : 'No inputted first name'}
                  </td>
                </tr>
                <tr>
                  <th>Last Name:</th>
                  <td>
                    {singleUser.lastName
                      ? singleUser.lastName
                      : 'No inputted last name'}
                  </td>
                </tr>
              </tbody>
            </table>
            <h4>Billing Address</h4>
            <table>
              <tbody>
                <tr>
                  <th>Billing Address:</th>
                  <td>
                    {singleUser.billingAddress
                      ? singleUser.billingAddress
                      : 'No inputted billing address'}
                  </td>
                </tr>
                <tr>
                  <th>Billing Address:</th>
                  <td>
                    {singleUser.billingAddress2
                      ? singleUser.billingAdress2
                      : 'No inputted billing address'}
                  </td>
                </tr>
                <tr>
                  <th>Billing City:</th>
                  <td>
                    {singleUser.billingCity
                      ? singleUser.billingCity
                      : 'No inputted billing city'}
                  </td>
                </tr>
                <tr>
                  <th>Billing State:</th>
                  <td>
                    {singleUser.billingState
                      ? singleUser.billingState
                      : 'No inputted billing state'}
                  </td>
                </tr>
                <tr>
                  <th>Billing ZIP:</th>
                  <td>
                    {singleUser.billingZIP
                      ? singleUser.billingZIP
                      : 'No inputted billing ZIP'}
                  </td>
                </tr>
              </tbody>
            </table>
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
    loadUserProfile: () => dispatch(me())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
