import { useDispatch } from 'react-redux'
import  { login } from '../reducers/authReducer'
import {
  useNavigate
} from 'react-router-dom'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = async (event) => {
    try {
      event.preventDefault()
      const username = event.target.username.value
      const password = event.target.password.value
      event.target.username.value = ''
      event.target.password.value = ''
      dispatch(login(username, password))
      navigate('/')
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          username{' '}
          <input
            type="text"
            name="username"
          />
        </div>
        <div>
          password{' '}
          <input
            type="password"
            name="password"
          />
        </div>
        <button type="submit" className="loginSubmitButton">
          login
        </button>
      </form>
    </>
  )
}

export default LoginForm
