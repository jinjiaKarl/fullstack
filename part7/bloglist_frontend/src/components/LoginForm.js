import { useDispatch } from 'react-redux'
import  { login } from '../reducers/authReducer'
import {
  useNavigate
} from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

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
          <TextField  label="username" id="username" />
        </div>
        <div>
          <TextField label="password" id="password" type='password'  />
        </div>
        <Button variant="contained" color="primary" type="submit">
            login
        </Button>
      </form>
    </>
  )
}

export default LoginForm
