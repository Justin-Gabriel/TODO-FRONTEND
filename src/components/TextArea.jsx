import PropTypes from 'prop-types';

const TextArea = ({
    label = '',
    register = () => {},
    name = '',
    errors = {},
    placeholder = '',
    required = false,
    validation = {},
    disabled = false,
    onChange = () => { },
}) => {
    return (
        <div className='flex flex-col w-full gap-1 mb-2'>
            {label && <label>{label}</label>}   
            <textarea
                name={name}
                placeholder={placeholder}
                {...register(name, { required: required && 'This field is required', ...validation })}
                className={`resize-none h-32 px-2 border rounded outline-none focus:border-blue-300 placeholder-gray-600 
                            ${errors[name] ? 'border-red-500' : 'border-gray-300'} ${disabled ? 'cursor-not-allowed' : 'cursor-auto'}`}
                disabled={disabled}
                onChange={onChange}
            />
            <div className='h-4 text-xs px-1 text-red-500'>
                {errors[name] && <p>{errors[name].message}</p>}
            </div>
        </div>
    );
};

TextArea.propTypes = {
    label: PropTypes.string,
    register: PropTypes.func,
    name: PropTypes.string,
    errors: PropTypes.object,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    validation: PropTypes.object,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.string,
};

export default TextArea
