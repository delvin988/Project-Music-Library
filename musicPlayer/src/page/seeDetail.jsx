import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Swal from "sweetalert2";

export default function SeeDetail() {
   const { id } = useParams();
   const [songDetail, setSongDetail] = useState(null);
   const [isLyricsVisible, setIsLyricsVisible] = useState(false);

   useEffect(() => {
      async function fetchSongDetail() {
         const options = {
            method: "GET",
            url: "https://shazam.p.rapidapi.com/shazam-songs/get-details",
            params: {
               id: id,
               locale: "en-US",
            },
            headers: {
               "X-RapidAPI-Key": "8c57de957amsh983360bdc0f6cabp11b955jsna5b110ee7fd9",
               "X-RapidAPI-Host": "shazam.p.rapidapi.com",
            },
         };

         try {
            const response = await axios.request(options);
            setSongDetail(response.data);
            console.log(response.data);
         } catch (error) {
            console.error(error);
         }
      }

      fetchSongDetail();
   }, [id]);

   const toggleLyricsVisibility = () => {
      setIsLyricsVisible(!isLyricsVisible);
   };

   const addFavourite = async (songData) => {
      try {
         await axios({
            method: "post",
            url: `http://localhost:3000/favourite`,
            headers: {
               Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
            data: songData,
         });
         Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Song added to favorites successfully!',
         });
      } catch (error) {
         console.log(error);
         if (error.response && error.response.data && error.response.data.message) {
            const errorMessage = error.response.data.message;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: errorMessage,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Failed to add user!',
            });
          }        
      }
   };

   return (
      <div className="bg-dark text-light min-vh-100 py-5"> {/* Ensure background covers the viewport */}
         <div className="container mt-4">
            {songDetail && songDetail.resources && (
               <div className="card">
                  <div className="card-body">
                     <div className="row">
                        <div className="col-md-4">
                           {songDetail.resources["shazam-songs"] && songDetail.resources["shazam-songs"][id]?.attributes?.artwork?.url && (
                              <img src={songDetail.resources["shazam-songs"][id].attributes.images.coverArt} className="img-fluid" alt="Cover Art" />
                           )}
                        </div>
                        <div className="col-md-8">
                           <h5 className="card-text"> {songDetail.resources["shazam-songs"][id].attributes.title}</h5>
                           <p className="card-title">Album: {Object.values(songDetail.resources.albums)[0]?.attributes?.name}</p>
                           <p className="card-text">
                              Artists: &nbsp;
                              {Object.values(songDetail.resources.artists).map((artist, index, array) => (
                                 <span key={artist.id}>
                                    {artist.attributes.name}
                                    {index !== array.length - 1 && ", "}
                                 </span>
                              ))}
                           </p>
                           <p className="card-text">
                              Genres: &nbsp;
                              {Object.values(songDetail.resources.genres).map((genre, index, array) => (
                                 <span key={genre.id}>
                                    {genre.attributes.name}
                                    {index !== array.length - 1 ? ", " : ""}
                                 </span>
                              ))}
                           </p>

                           {songDetail.resources.lyrics && Object.keys(songDetail.resources.lyrics).length > 0 && (
                              <div>
                                 <h6 className="card-subtitle mb-2 text-muted d-flex align-items-center" onClick={toggleLyricsVisibility}>
                                    Lyrics:
                                    {isLyricsVisible ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                                 </h6>
                                 <div className={`collapse${isLyricsVisible ? " show" : ""}`}>
                                    {songDetail.resources.lyrics[Object.keys(songDetail.resources.lyrics)[0]]?.attributes?.text &&
                                       songDetail.resources.lyrics[Object.keys(songDetail.resources.lyrics)[0]]?.attributes?.text.map((line, index) => (
                                          <p key={index}>
                                             {line.trim() !== "" && "- "}
                                             {line}
                                             <br />
                                          </p>
                                       ))}
                                 </div>
                              </div>
                           )}

                           {songDetail.resources["shazam-songs"] && songDetail.resources["shazam-songs"][id]?.attributes?.streaming?.preview && (
                              <audio controls className="mt-3">
                                 <p>Preview:</p>
                                 <source src={songDetail.resources["shazam-songs"][id]?.attributes?.streaming?.preview} type="audio/mpeg" />
                                 Your browser does not support the audio element.
                              </audio>
                           )}
                        </div>
                        <button
                           className="btn btn-success mt-3 ml-auto"
                           type="button"
                           onClick={() => {
                              const artistNames = Object.values(songDetail.resources.artists).map(artist => artist.attributes.name).join(", ");
                              const genres = Object.values(songDetail.resources.genres).map(genre => genre.attributes.name).join(", ");                           addFavourite({
                                 artistName: artistNames,
                                 genres: genres,
                                 imgUrl: songDetail.resources["shazam-songs"][id].attributes.images.coverArt,
                                 album: Object.values(songDetail.resources.albums)[0]?.attributes?.name,
                                 title: songDetail.resources["shazam-songs"][id]?.attributes?.title,
                                 preview: songDetail.resources["shazam-songs"][id]?.attributes?.streaming?.preview,
                                 lyric: songDetail.resources.lyrics[Object.keys(songDetail.resources.lyrics)[0]]?.attributes?.text.join("\n"),
                              });
                           }}>
                           + Favorite
                        </button>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
