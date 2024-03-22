/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CardSearch from "../components/CardSearch";

export default function SearchResult() {
  const navigate = useNavigate();
  // Retrieve search query from URL parameters
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [searchQuery, setSearchQuery] = useState(query || "");

  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetchData();
  }, [query]); 

  const fetchData = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: "https://shazam.p.rapidapi.com/search",
        params: {
          term: query,
          locale: "en-US",
          offset: "0",
          limit: "5",
        },
        headers: {
          "X-RapidAPI-Key": "8c57de957amsh983360bdc0f6cabp11b955jsna5b110ee7fd9",
          "X-RapidAPI-Host": "shazam.p.rapidapi.com",
        },
      });
      setTracks(data.tracks.hits.map(hit => hit.track));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    navigate(`/SearchResult?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="bg-dark text-light py-5">
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button
                className="btn btn-success"
                type="button"
                onClick={handleSearchSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="home">
        <div className="container my-5">
          <div className="row row-cols-4 g-3">
            {tracks.map((trackItem) => (
              <CardSearch key={trackItem.key} track={trackItem} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
