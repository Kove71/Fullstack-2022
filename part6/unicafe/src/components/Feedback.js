import Button from './Button'

const Feedback = (props) => (
    <>
        <Button
            onClick={props.increaseGood}
            text={props.textGood}
        />
        <Button
            onClick={props.increaseNeutral}
            text={props.textNeutral}
        />
        <Button
            onClick={props.increaseBad}
            text={props.textBad}
        />
        <Button
            onClick={props.reset}
            text={props.textReset}
        />
    </>
)

export default Feedback