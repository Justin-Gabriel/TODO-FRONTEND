import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from "../components/Input.jsx";
import Button from '../components/Button.jsx';
import { useAuth } from '../hooks/useAuth.jsx';

const Authentication = ({ authType }) => {
    const isSignup = authType === 'Signup' ? true : false;
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { signup, login, isLoading } = useAuth();
    const location = useLocation();

    const onSubmit = async (values) => {
        if (isSignup) {
            await signup(values);
        } else {
            await login(values);
        }
    };

    useEffect(() => {
        reset();

    }, [location, reset])
    
    
    return (
        <div className="h-screen flex justify-center items-center bg-gray-100 ">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={`w-[500px] flex flex-col border rounded-lg bg-white p-8 ${isSignup ? 'h-[440px]' : 'h-[370px]'}`}>
                    <p className="text-2xl font-semibold mb-9 text-center">{authType}</p>
                    {isSignup && (
                        <Input
                            name="fullName"
                            register={register}
                            errors={errors}
                            placeholder="Full name"
                            required={true}
                            disabled={isLoading}
                        />
                    )}
                    <Input
                        name="email"
                        register={register}
                        errors={errors}
                        placeholder="Email"  
                        required={true}
                        validation={{
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Please enter a valid email address"
                            }
                        }}
                        disabled={isLoading}
                    />
                    <Input
                        name="password"
                        type="password"
                        register={register}
                        errors={errors}
                        placeholder="Password"
                        required={true}
                        validation={{
                            minLength: { value: 6, message: "Password must be at least 6 characters long" },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                            }
                        }}
                        disabled={isLoading}
                    />
                    <Button type="submit" buttonType="auth" disabled={isLoading} title={authType} />
                    <Link to={`/${isSignup ? "login" : "signup"}`}>
                        <p className={`p-3 ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer' }`} >{isSignup ?  'Already have an account?': 'Create an account' }</p>
                    </Link>
                    
                </div>
            </form>
        </div>

    )
}

Authentication.propTypes = {
    authType: PropTypes.string,
}

export default Authentication