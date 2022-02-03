import React from "react";
import { useState, useContext } from "react";

import { Link } from "react-router-dom";
import "./Login.css";
import { UserContext } from "../../UserContext";
import { userRequest } from "../../axios";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    usernameError: "",
    passwordError: "",
  });

  const submitHandler = async (e) => {
   
    e.preventDefault();
    setErrors(errors);

    try {
      
      const data = await userRequest.post("signin",{email:details.email,password:details.password},{withCredentials:true}).then(res=>res.data).then(data1=>data1).catch(err=>
        {
          
          setErrors({emailError:err.response.data.errors.email,passwordError:err.response.data.errors.password})
        })
      // await fetch("http://localhost:5000/signin", {
      //   method: "POST",
      //   credentials: "include",
      //   body: JSON.stringify({
      //     email: details.email,
      //     password: details.password,
      //   }),
      //   headers: { "Content-Type": "application/json" },
      // });

      // const data = await res.json();
      // console.log(details.email);


      if (data.errors) {
        
        setErrors({
          emailError: data.errors.email,
          passwordError: data.errors.password,
        });
      }
      if (data.accessToken) {
        setUser(data)
        localStorage.setItem("token",data.accessToken)
     
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto mt-5">
            <div className="card border-0 shadow rounded-3">
              <div className="card-body-login p-4 p-sm-5">
                <h1 className="card-title text-center mb-5 fw-bold fs-3">
                  Login
                </h1>
                <form className="loginform" onSubmit={(e) => submitHandler(e)}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="email"
                      id="username"
                      name="username"
                      onChange={(e) => {
                        setDetails((prevState) => ({
                          ...prevState,
                          email: e.target.value,
                        }));
                      }}
                    />
                    <label htmlFor="username">Email</label>
                  <div className="text-danger" type="password">
                    {errors.emailError}
                  </div>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder=" Password"
                      id="password"
                      name="password"
                      onChange={(e) => {
                        setDetails((prevState) => ({
                          ...prevState,
                          password: e.target.value,
                        }));
                      }}
                    />
                    <label htmlFor="password">Password</label>
                  <div className="text-danger" type="password">
                    {errors.passwordError}
                  </div>
                  </div>
                  <div className="d-grid">
                    <button
                      className="btn btn-dark btn-login fw-bold my-3"
                      type="submit"
                    >
                      Login
                    </button>
                    
                    {/* <div className="or col-lg-2 my-3">
              <h3>or</h3>
            </div>  */}
           
                    <div
                      className="btn btn-dark btn-login fw-bold my-3"
                      
                    >
                      <Link
                        style={{ color: "white", textDecoration: "none" }}
                        to="/signup"
                      >
                        Signup
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {user}
    </div>
  );
};

export default Login;
