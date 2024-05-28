import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth"
import Button from "../components/Button"


const Header = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogoClick = () => {
        navigate('/');
    }
    return (
        <div className="h-[100px] flex justify-between items-center p-5 bg-blue-50 border">
            <p className="text-3xl font-medium cursor-pointer" onClick={handleLogoClick} >TO-DO LIST</p>
            <Button title="Logout" buttonType="auth" onClick={() => logout()} />           
        </div>
    )
}

export default Header