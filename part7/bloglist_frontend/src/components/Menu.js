import {
  Link
} from 'react-router-dom'
const Menu = () => {
  return (
    <>
      <Link to="/">blogs</Link> &nbsp;
      <Link to="/users">users</Link>
    </>
  )
}
export default Menu