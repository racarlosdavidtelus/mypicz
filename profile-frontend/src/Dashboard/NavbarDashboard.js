import { useHistory } from "react-router-dom";

const Navbar = () => {

    const history = useHistory();

    const onProfile = (event) => {
        event.preventDefault();
        history.replace("/profile")
    }

    const onDashboard = (event) => {
        history.replace("/dashboard")
    }

    const onMyPokemons = (event) => {
        history.replace("/mypokemons")
    }

    const onLogOut = (event) => {
        localStorage.removeItem("user");
        history.replace("/")
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
                    <button className="btn btn-light" onClick={onDashboard}>Pokemon Gallery</button>
                </li>
                <li className="nav-item">
                    <button className="btn btn-light" onClick={onMyPokemons}>My Pokemons</button>
                </li>
           
            </ul>
        </div>
        <button className="btn btn-light" onClick={onLogOut}><i className="bi bi-x-circle"></i></button>
        </nav>
    )
    
}

export default Navbar;
