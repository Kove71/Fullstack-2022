import { connect } from "react-redux"

const Notification = (props) => {
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    if (!props.notification) {
        return <></>
    }
    return (
        <div style={style}>
            {props.notification}
        </div>
    )
}
const mapStateToProps = (state) => {
    return { notification: state.notification }
}
const ConnectsdNotification = connect(mapStateToProps)(Notification)
export default ConnectsdNotification