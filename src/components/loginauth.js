function loginauth() {
    const logfunc = () => {
        if (!sessionStorage.getItem('user')) {
            alert('Please login!');
            window.location.replace("http://localhost:3000");
        }
    }
    logfunc();
}
export default loginauth