import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  // we useNavigate to redirect client after register
  let navigate = useNavigate();

  // spinner button
  const [registerFlag, setRegisterFlag] = useState(false);

  const [errList, setErrList] = useState([]);
  const [failedMessage, setfailedMessage] = useState("");
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
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

    setRegisterFlag(true);

    let schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(10).required(),
      last_name: Joi.string().alphanum().min(3).max(10).required(),
      age: Joi.number().min(18).max(30).required(),
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
      console.log(joiResponse.error.details);
      setErrList(joiResponse.error.details);

      // to stop spinner
      setRegisterFlag(false);
    } else {
      // call API
      let { data } = await axios.post(
        "https://route-egypt-api.herokuapp.com/signup",
        user
      );
      console.log(data);
      // to stop spinner
      if (data.errors) {
        setfailedMessage(data.message);
      } else {
        navigate("/login");
      }
      setRegisterFlag(false);
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

          <label htmlFor="first_name">first_name</label>
          <input
            onChange={getUser}
            type="text"
            className="my-3 form-control"
            id="first_name"
            placeholder="first_name"
          />
          {getCurrentError("first_name").length === 0 ? (
            ""
          ) : (
            <div className="alert alert-danger">
              {getCurrentError("first_name")}
            </div>
          )}
          <label htmlFor="last_name">last_name</label>
          <input
            onChange={getUser}
            type="text"
            className="my-3 form-control"
            id="last_name"
            placeholder="last_name"
          />
          {getCurrentError("last_name").length === 0 ? (
            ""
          ) : (
            <div className="alert alert-danger">
              {getCurrentError("last_name")}
            </div>
          )}
          <label htmlFor="age">age</label>
          <input
            onChange={getUser}
            type="number"
            className="my-3 form-control"
            id="age"
            placeholder="age"
          />
          {getCurrentError("age").length === 0 ? (
            ""
          ) : (
            <div className="alert alert-danger">{getCurrentError("age")}</div>
          )}
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
          />
          {getCurrentError("password").length === 0 ? (
            ""
          ) : (
            <div className="alert alert-danger">
              {getCurrentError("password")}
            </div>
          )}
          <button className="my-3 btn btn-outline-info">
            {" "}
            {registerFlag ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
