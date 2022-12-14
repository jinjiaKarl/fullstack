import { connect } from 'react-redux'

const Notification = ( props) => {
    const notification = props.messages
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    if (notification === null) {
      return null
    }
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }

const mapStateToProps = (state) => {
    return {
      messages: state.messages
    }
}


export default connect(mapStateToProps)(Notification)