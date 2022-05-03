import { useHistory } from "react-router-dom";

const Navbar = () => {

    const history = useHistory();

    const onMainFrontend = () => {
        window.location.href = "http://www.google.com";
    }

    const onProfile = () => {
        history.replace("/profile")
    }

    const onDashboard = () => {
        history.replace("/")
    }

    const onChangePassword = () => {
        history.replace("/password")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
    
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <button className="btn btn-light" onClick={onMainFrontend}><i class="bi bi-arrow-bar-left"></i>{`  `}</button>
                </li>
                <li className="nav-item">
                    <button className="btn btn-light" onClick={onProfile}><i className="bi bi-person-fill"></i>{`  `}</button>
                </li>
                <li className="nav-item">
                    <button className="btn btn-light" onClick={onDashboard}>Gallery</button>
                </li>
                <li className="nav-item">
                    <button className="btn btn-light" onClick={onChangePassword}>Change Password</button>
                </li>
            </ul>
        </div>
        </nav>
    )
}

export default Navbar;
