import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/users'

export class AdminAllUser extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    try {
      this.props.getUsers()
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const users = this.props.users || []

    return (
      <div>
        <h2>Users</h2>

        <table>
          {users.map(user => (
            <div key={user.id}>
              <tbody>
                <tr>
                  <th>User ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Google ID</th>
                  <th>User Status</th>
                </tr>
                <tr>
                  <td>{user.id}</td>
                  <td>
                    {user.firstName ? user.firstName : 'No inputted first name'}
                  </td>
                  <td>
                    {user.lastName ? user.lastName : 'No inputted last name'}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    {user.googleId
                      ? user.googleId
                      : 'No Google account associated'}
                  </td>
                  <td>
                    {user.isAdmin ? 'administrator' : 'non-administrator'}
                  </td>
                </tr>
                <tr>
                  <th>Billing Address</th>
                  <th>Billing Address</th>
                  <th>Billing City</th>
                  <th>Billing State</th>
                  <th>Billing ZIP</th>
                </tr>
                <tr>
                  <td>
                    {user.billingAddress
                      ? user.billingAddress
                      : 'No address on file'}
                  </td>
                  <td>
                    {user.billingAddress2
                      ? user.billingAddress2
                      : 'No address on file'}
                  </td>
                  <td>
                    {user.billingCity ? user.billingCity : 'No city on file'}
                  </td>
                  <td>
                    {user.billingState ? user.billingState : 'No state on file'}
                  </td>
                  <td>
                    {user.billingZIP ? user.billingZIP : 'No ZIP on file'}
                  </td>
                </tr>
              </tbody>
              <hr />
            </div>
          ))}
        </table>
      </div>
    )
  }
}

const mapState = state => ({
  users: state.users.all
})

const mapDispatch = dispatch => ({
  getUsers: () => dispatch(fetchUsers())
})

export default connect(mapState, mapDispatch)(AdminAllUser)
