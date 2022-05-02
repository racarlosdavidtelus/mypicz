import { useHistory } from "react-router-dom";

const Navbar = () => {

    const history = useHistory();

    const onProfile = (event) => {
        event.preventDefault();
        history.replace("/profile")
    }

    const onDashboard = (event) => {
        history.replace("/")
    }

    const onChangePassword = (event) => {
        history.replace("/password")
    }

    const onLogOut = (event) => {
        history.push("https://github.com/racarlosdavid?tab=repositories")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
    
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <button className="btn btn-light" onClick={onProfile}><i className="bi bi-person-fill"></i>{`  `}</button>
                </li>
                <li className="nav-item">
                    <button className="btn btn-light" onClick={onDashboard}>Gallery</button>
                </li>
                <li className="nav-item">
                    <button className="btn btn-light" onClick={onChangePassword}>Change Password</button>
                </li>
                <li className="nav-item">
                    <form action="https://google.com">
                        <button type="submit" className="btn btn-light">Main Frontend</button>
                    </form>
                </li>
            </ul>
        </div>
        
       
        </nav>
    )
    
}

export default Navbar;
