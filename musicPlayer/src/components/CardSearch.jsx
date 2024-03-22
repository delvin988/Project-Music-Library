/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

export default function CardSearch({ track }) {
    const navigate = useNavigate();
  
    return (
        <div className="card mb-3" style={{ marginBottom: "20px" }}>
            <img src={track.images.coverart} className="card-img-top" alt={track.title} style={{ width: "100%" }} />
            <div className="card-body">
                <h5 className="card-title">{track.title}</h5>
                <p className="card-text">Artist: {track.subtitle}</p>
                <div className="d-flex justify-content-between"> 
                    <button
                        onClick={() => navigate(`/seeDetail/${track.key}`)}
                        className="btn btn-success mr-2" 
                        type="button"
                    >
                        See Detail
                    </button>
                </div>
            </div>
        </div>
    );
}
