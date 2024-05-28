import PropTypes from 'prop-types'

const Input = ({
    label='',
    type = 'text',
    register=() => {},
    name='',
    errors={},
    placeholder = '',
    required = false,
    validation = {},
    disabled = false,
    maxlength="50",
}) => {
    return (
        <div className='flex flex-col w-full gap-1 mb-2'>
            {label && <label>{label}</label>}
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                {...register(name, {required: required && 'This field is required', ...validation})}
                className={`h-10 px-2 border rounded outline-none focus:border-blue-300 placeholder-gray-600 
                            ${errors[ name ] ? 'border-red-500' : 'border-gray-300'} ${disabled ? 'cursor-not-allowed' : 'cursor-auto'}`}
                disabled={disabled}
                maxLength={maxlength}
            />
            <div className='h-4 text-xs px-1 text-red-500'> 
                {errors[name] && <p>{errors[name].message}</p>}
            </div>
        </div>
    )

}

Input.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    register: PropTypes.func,
    name: PropTypes.string,
    errors: PropTypes.object,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    validation: PropTypes.object,
    disabled: PropTypes.bool,
    maxlength: PropTypes.string,
}

export default Input