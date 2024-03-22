/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const handleCredentialResponse = async (response) => {
    try {
      const {data} = await axios({
        method: "post",
        url: "http://localhost:3000/google-login",
        headers: {
          'google-token': response.credential
        }
      })
      localStorage.setItem("access_token", data.access_token);
      navigate("/home");
      console.log(data);
    } catch (error) {
      console.log(error);
    } 
  }
  useEffect(() =>{
    google.accounts.id.initialize({
      client_id: "933231867226-9efkmdhmftmj109ms1qmodtjct3id4ml.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("google-button"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    // google.accounts.id.prompt();
  },[] )

  function handleInputLoginForm(event) {
    const { name, value } = event.target;
    setLoginInput({
      ...loginInput,
      [name]: value,
    });
  }

  async function handleSubmitLogin(event) {
    event.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:3000/login",
        data: loginInput,
      });
      localStorage.setItem("access_token", response.data.access_token);
      navigate("/home");
    } catch (error) {
      console.error(error);
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
          text: 'Failed to Login!',
        });
      }        
    }
  }

  return (
    <>
      <section id="login-section">
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
          <div className="card p-3 w-50">
            <h4 className="text-center mb-3">Login</h4>
            <form id="login-form" onSubmit={handleSubmitLogin}>
              <label htmlFor="form-email" className="form-label">
                Email
              </label>
              <input
                name="email"
                id="form-email"
                type="email"
                placeholder="Input email"
                className="form-control mb-3"
                onChange={handleInputLoginForm}
                autoComplete="email" 
              />
              <label htmlFor="form-password" className="form-label">
                Password
              </label>
              <input
                name="password"
                id="form-password"
                type="password"
                placeholder="Input password"
                className="form-control mb-3"
                onChange={handleInputLoginForm}
                autoComplete="current-password" 
              />
              <button type="submit" className="btn btn-warning">
                Submit
              </button>
            </form>
            <div id="google-button"></div>
            <div className="text-center mt-3">
              Don't have an account?{" "}
              <Link to="register">Create an account</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
