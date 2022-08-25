const Message = ({ message, color }) => {
    if (!message) {
        return <></>
    }

    const messageStyle = {
        color: color,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
        <div style={messageStyle}>
            {message}
        </div>
    )
}

export default Message