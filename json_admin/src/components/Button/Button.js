import './button.styles.scss'
const BUTTON_TYPE_CLASS = {
    google: "google-sign-in",
    faceBook:"faceBook-sign-in"
}
const Button = ({children, buttonType, ...otherProps}) => {
    return(
        <button className={`button-container ${BUTTON_TYPE_CLASS[buttonType]} btn`} {...otherProps}>{children}</button> 
    )
}

export default Button