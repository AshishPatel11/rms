import { useNavigate } from 'react-router-dom'

const Loginauth = (props) => {
    let navigate = useNavigate();
    const logfunc = async () => {
        const User = await JSON.parse(sessionStorage.getItem("user"));
        if (!sessionStorage.getItem('user')) {
            alert('Please login!');
            window.location.replace("http://localhost:3000");
        }
        else if (User.type !== props.type && props.type !== undefined) {
            navigate("/404", { replace: true })
        }
    }
    logfunc();
}
export default Loginauth