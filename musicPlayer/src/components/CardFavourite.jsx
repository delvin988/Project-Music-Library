import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";


/* eslint-disable react/prop-types */
export default function CardFavourite({ favourite, onDelete }) {
    const [isLyricsVisible, setIsLyricsVisible] = useState(false);

    async function handleDeleteButton() {
        try {
            await onDelete(favourite.id);
        } catch (error) {
            console.log(error);
        }
    }

    const toggleLyricsVisibility = () => {
        setIsLyricsVisible(!isLyricsVisible);
    };

    return (
        <div className="card mb-3 d-flex flex-column">
            <img
                src={favourite.imgUrl}
                className="card-img-top"
                alt={favourite.title}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
                <h5 className="card-title">{favourite.title}</h5>
                <p className="card-text">Album: {favourite.album}</p>
                <p className="card-text">Genres: {favourite.genres}</p>
                <h6 className="card-subtitle mb-2 text-muted d-flex align-items-center" onClick={toggleLyricsVisibility}>
                    Lyrics:
                    {isLyricsVisible ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                </h6>
                <div className={`collapse${isLyricsVisible ? " show" : ""}`}>
                    {favourite.lyric.split("\n").map((line, index) => (
                        <p  key={index}>
                        {line.trim() !== "" && "- "}
                        {line}
                        <br />
                        </p>
                    ))}
                </div>
                <div className="btn-group" role="group" aria-label="Job Actions">
                    <button onClick={handleDeleteButton} type="button" className="btn btn-danger">
                        Delete
                    </button>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <audio controls className="w-100">
                            <p>Preview:</p>
                            <source src={favourite.preview} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </div>
            </div>
        </div>
    );
}
