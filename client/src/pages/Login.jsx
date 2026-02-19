import {useNavigate} from 'react-router-dom';
function Login({setIsLoggedIn}){
    const navigate = useNavigate();
    const handleLogin=()=>{
        localStorage.setItem('isLoggedIn',true);
        setIsLoggedIn(true);// Update the state in App component using the setIsLoggedIn function passed as a prop
        navigate('/dashboard');
    }
    return(
        <div>
            <h1>Login Page</h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}
export default Login;
