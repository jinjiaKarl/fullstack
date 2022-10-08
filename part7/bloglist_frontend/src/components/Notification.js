import { useSelector } from 'react-redux'
import Alert from '@mui/material/Alert'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification === null) {
    return null
  }

  return (
    <div>
      {notification.type === 'alert' ? <Alert severity="error">{notification.message}</Alert> : <Alert severity="success">{notification.message}</Alert>}
    </div>
  )
}

export default Notification
