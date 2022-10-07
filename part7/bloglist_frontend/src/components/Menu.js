import {
  Link
} from 'react-router-dom'
const Menu = () => {
  return (
    <div>
      <Link to="/">blogs</Link> &nbsp;
      <Link to="/users">users</Link>
    </div>
  )
}
export default Menu