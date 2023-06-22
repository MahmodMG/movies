import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ decodeToken }) {
  // we useNavigate to redirect client after register
  let navigate = useNavigate();

  // spinner button
  const [loginFlag, setLoginFlag] = useState(false);

  const [errList, setErrList] = useState([]);

  const [failedMessage, setfailedMessage] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const getCurrentError = (key) => {
    for (const err of errList) {
      if (err.context.key === key) {
        return err.message;
      }
    }
    return "";
  };

  const getUser = (e) => {
    // to remove joi errors when user write
    setErrList([]);

    // console.log("change");
    // console.log(e.target.value);

    // get value from input
    let inputValue = e.target.value;

    //new copy from user
    let newUser = { ...user };
    // newUser.first_name = inputValue;
    newUser[`${e.target.id}`] = inputValue;
    // console.log(newUser);
    setUser(newUser);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    // console.log(e);

    setLoginFlag(true);

    let schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      // pattern(regex)
      password: Joi.string()
        .pattern(/^[a-z0-9]{4,8}$/i)
        .required(),
    });
    let joiResponse = schema.validate(user, { abortEarly: false });
    // console.log(joiResponse);
    if (joiResponse.error) {
      setErrList(joiResponse.error.details);

      // to stop spinner
      setLoginFlag(false);
    } else {
      // call API
      let { data } = await axios.post(
        "https://route-egypt-api.herokuapp.com/signin",
        user
      );
      console.log(data);
      if (data.message === "incorrect password") {
        setfailedMessage(data.message);
      } else {
        localStorage.setItem("tkn", data.token);
        decodeToken();
        navigate("/home");
      } // to stop spinner
      setLoginFlag(false);
    }
  };

  return (
    <>
      <div className="w-75 mx-auto">
        <form onSubmit={submitForm}>
          {failedMessage.length === 0 ? (
            ""
          ) : (
            <div className="alert alert-danger">{failedMessage}</div>
          )}
          {/* {errList.map((err, idx) => {
            return (
              <div key={idx} className="alert alert-danger">
                {err.message}
              </div>
            );
          })} */}
          <label htmlFor="email">email</label>
          <input
            onChange={getUser}
            type="email"
            className="my-3 form-control"
            id="email"
            placeholder="email"
          />
          {getCurrentError("email").length === 0 ? (
            ""
          ) : (
            <div className="alert alert-danger">{getCurrentError("email")}</div>
          )}
          <label htmlFor="password">password</label>
          <input
            onChange={getUser}
            type="password"
            className="my-3 form-control"
            id="password"
            placeholder="password"
          />{" "}
          {getCurrentError("password").length === 0 ? (
            ""
          ) : (
            <div className="alert alert-danger">
              {getCurrentError("password")}
            </div>
          )}
          <button className="my-3 btn btn-outline-info">
            {loginFlag ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
