import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/users'

export class AuthUsers extends React.Component {
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
    return (
      <div>
        <h2>Users</h2>

        {this.props.users.map(user => (
          <div key={user.id}>
            <p>
              <b>
                {user.id} |{' '}
                {user.firstName ? user.firstName : 'No inputted first name | '}{' '}
                {user.lastName ? user.lastName : 'No inputted last name'}
              </b>
            </p>
            <p>
              email: {user.email} | Google ID:{' '}
              {user.googleId ? user.googleId : 'No Google account associated'}
            </p>
            <p>
              user status:{' '}
              {user.isAdmin ? 'administrator' : 'non-administrator'}
            </p>
            <p>
              billing address:{' '}
              {user.billingAddress ? user.billingAddress : 'No address on file'}
            </p>
            <p>
              billing address:{' '}
              {user.billingAddress2
                ? user.billingAddress2
                : 'No address on file'}
            </p>
            <p>
              city: {user.billingCity ? user.billingCity : 'No city on file'} |
              state:{' '}
              {user.billingState ? user.billingState : 'No state on file'}
            </p>
            <p>ZIP: {user.billingZIP ? user.billingZIP : 'No ZIP on file'}</p>
            <hr />
          </div>
        ))}
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

export default connect(mapState, mapDispatch)(AuthUsers)
