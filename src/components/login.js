function login() {
    return (
        <div className="loginForm">
            <form className="form">
                <div className="input-fields">
                    <span className="material-symbols-outlined">account_circle</span>
                    <input type="text" className="form-text" placeholder="Enter Username" />
                </div>
                <input type="submit" className="form-btn" value="Verify"/>
            </form>
        </div>
    );
}
export default login;