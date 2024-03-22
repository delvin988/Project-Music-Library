/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

export default function Card({ track }) {
    const navigate = useNavigate()
  return (
    <div className="card" style={{marginBottom: "20px" }}>
      <img src={track.images.coverart} className="card-img-top" alt={track.title} />
      <div className="card-body">
        <h5 className="card-title">{track.title}</h5>
        <p className="card-text">Artist: {track.artists[0].alias}</p>
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
