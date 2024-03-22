/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
   const navigate = useNavigate();
   const [addInput, setAddInput] = useState({
      username: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
   });

   function handleInputChange(event) {
      const { name, value } = event.target;
      setAddInput({
         ...addInput,
         [name]: value,
      });
   }

   async function handleSubmitFormAdd(event) {
      event.preventDefault();
      try {
         const { data } = await axios({
            method: "post",
            url: "http://localhost:3000/register",
            data: addInput,
            headers: {
               Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
         });
         navigate("/home");
      } catch (error) {
         console.error("Error updating job:", error);
         if (error.response && error.response.data && error.response.data.message) {
            const errorMessage = error.response.data.message;
            Swal.fire({
               icon: "error",
               title: "Oops...",
               text: errorMessage,
            });
         } else {
            Swal.fire({
               icon: "error",
               title: "Oops...",
               text: "Failed to add user!",
            });
         }
      }
   }
   return (
      <>
         <section id="add-section">
            <div className="container d-flex justify-content-center my-5">
               <div className="card p-3 w-50">
                  <h4 className="text-center mb-3">Add New User</h4>
                  <form onSubmit={handleSubmitFormAdd} id="add-form">
                     <label htmlFor="form-username" className="form-label">
                        Username
                     </label>
                     <input id="form-username" type="text" placeholder="input username" className="form-control mb-3" name="username" onChange={handleInputChange} />
                     <label htmlFor="form-email" className="form-label">
                        Email
                     </label>
                     <input id="form-email" type="text" placeholder="input email" className="form-control mb-3" name="email" onChange={handleInputChange} />
                     <label htmlFor="form-password" className="form-label">
                        Password
                     </label>
                     <input id="form-password" type="password" placeholder="input Password" className="form-control mb-3" name="password" onChange={handleInputChange} />

                     <button type="submit" className="btn btn-warning">
                        Submit
                     </button>
                  </form>
                  <div className="text-center mt-3 d-flex align-items-center justify-content-center">
                     <span>You have an account? </span>
                     <button className="btn btn-link" onClick={() => navigate("/login")}>
                        Login now
                     </button>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}
