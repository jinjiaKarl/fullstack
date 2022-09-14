const Notification = ({ message, isError }) => {
    if (message === null || message === '') {
        return null
    }
    const errorStyle = {
        color: 'red',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    if (isError) { 
        return (
            <div className="error" style={errorStyle}>
                {message}
            </div>
        )
    }
    // 注意赋值的时候，先解构对象，再覆盖属性
    const successStyle = {
        ...errorStyle,
        color: 'green'
    }
    console.log(message," ", successStyle)

    return (
        <div className="success" style={successStyle}>
        {message}
        </div>
    )
}

export default Notification