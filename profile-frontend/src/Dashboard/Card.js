

function Card({ foto,index }) {
    return (
        <div key={index} >
            <div class="card">
                <img className="card-img-top" src={foto.url}  alt="Card image cap" />
                <div class="card-body">
                    <h5 className="card-title">Descripcion</h5>
                    <p className="card-text">{foto.descripcion}</p>
                    <a href={foto.url} target="_blank" class="btn btn-primary">View picture</a>
                </div>
            </div>
        </div>
    )
}

export default Card;