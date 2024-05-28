import { forwardRef } from 'react';
import PropTypes from 'prop-types'

const Button = forwardRef(function Button({
    title= '',
    type= 'button',
    onClick= () => { },
    disabled = false,
    buttonType ='',
}, ref) {
    const buttonstyles = {
        primary: "bg-[#5C995C] text-white ",
        secondary: "bg-[#ffffff] text-black border border-black",
        add: "bg-[#5C995C] text-white",
        auth: "bg-blue-600 text-white",
        edit: "bg-blue-500 text-white",
        status: "bg-green-500 text-white",
        delete: "bg-red-500 text-white",
    }
    return (
        <>
            <button ref={ref} className={`h-10 min-w-16 px-4 rounded text-center ${buttonstyles[buttonType]}`} onClick={onClick} type={type} disabled={disabled}>{title}</button>
        </>
    )
});

Button.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    buttonType: PropTypes.string,
}

export default Button