import axios from 'axios'

//action types
const GET_USERS = 'GET_USERS'

//action creators
const getUsers = users => ({
  type: GET_USERS,
  users
})

//thunk creators
export const fetchUsers = () => {
  return async dispatch => {
    try {
      const {data: users} = await axios.get('/api/admin/users')
      dispatch(getUsers(users))
    } catch (error) {
      console.log('Error fetching users from the server!')
    }
  }
}

const initialState = {
  all: []
}

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        all: action.users
      }
    default:
      return state
  }
}
