/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import CardFavourite from "../components/CardFavourite";
import { fetchDataFavourite } from "../store/favouriteSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Favourite2() {
   const dispatch = useDispatch();
   const data = useSelector((state) => state.favourite.data);
   const [searchQuery, setSearchQuery] = useState("");
   const navigate = useNavigate();

   useEffect(() => {
      dispatch(fetchDataFavourite());
   }, []);

   const onDelete = async (id) => {
      try {
         await axios({
            method: "delete",
            url: `http://localhost:3000/favourite/${id}`,
            headers: {
               Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
         });
         dispatch(fetchDataFavourite());
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
      <>
         <div className="bg-dark text-light py-5">
            <div className="container">
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
                        <button className="btn btn-success" type="button" onClick={handleSearchSubmit}>
                           Submit
                        </button>
                     </div>
                  </div>
         <div className="container my-5">
            <div className="row row-cols-4 g-3">
               {data.map((favourite) => (
                  <div className="col" key={favourite.id}>
                     <CardFavourite favourite={favourite} onDelete={onDelete} />
                  </div>
               ))}
            </div>
         </div>
               </div>
            </div>
         </div>

      </>
   );
}

export default Favourite2;
