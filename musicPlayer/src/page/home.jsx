import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

export default function Home() {
   const [track, setTopTrack] = useState([]);
   const [searchQuery, setSearchQuery] = useState("");
   const navigate = useNavigate();

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      try {
         const { data } = await axios({
            method: "GET",
            url: "https://shazam.p.rapidapi.com/charts/track",
            params: {
               locale: "en-US",
               pageSize: "20",
               startFrom: "0",
            },
            headers: {
               "X-RapidAPI-Key": "8c57de957amsh983360bdc0f6cabp11b955jsna5b110ee7fd9",
               "X-RapidAPI-Host": "shazam.p.rapidapi.com",
            },
         });
         setTopTrack(data.tracks);
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
         <div className="container">
            <div className="row">
               <div className="col-lg-6 offset-lg-3">
                  <div className="input-group mb-3">
                     <input type="text" className="form-control" placeholder="Search..." value={searchQuery} onChange={handleSearchChange} />
                     <button className="btn btn-success" type="button" onClick={handleSearchSubmit}>Submit</button>
                  </div>
               </div>
            </div>
         </div>
         <div className="container mt-4">
            <div className="row row-cols-4 g-3">
               {track.map((trackItem) => (
                  <div className="col" key={trackItem.key}>
                     <Card track={trackItem} />
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
