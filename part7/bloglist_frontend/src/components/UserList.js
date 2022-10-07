import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
            </td>
            <td>
              <b>blogs  created</b>
            </td>
          </tr>
          <tr>
            <td>
              <Link to={`/users/${user.id}`}>{user.username}</Link>
            </td>
            <td>
              {user.blogs.length}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const UserList = () => {
  const users = useSelector((state) => state.users)
  if (!users) {
    return null
  }
  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => <User key={user.id} user={user} />)}
    </div>
  )
}

export default UserList