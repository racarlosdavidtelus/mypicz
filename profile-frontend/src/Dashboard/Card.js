

function Card({ foto,index }) {
    return (
        <div key={index} >
            <div className="card">
                <img className="card-img-top" src={foto.url}  alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">Descripcion</h5>
                    <p className="card-text">{foto.descripcion}</p>
                    <a href={foto.url} target="_blank" className="btn btn-primary">View picture</a>
                </div>
            </div>
        </div>
    )
}

export default Card;