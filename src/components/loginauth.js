function loginauth() {
    if (!sessionStorage.getItem('user')) {
        alert('Please login!');
        window.location.replace("http://localhost:3000");
    }
}
export default loginauth