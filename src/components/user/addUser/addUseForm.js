import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";

const AddUserUseForm = () => {
  // --------------------------------------------------------------------------------------
  const { register, handleSubmit } = useForm();
  const { request, response } = useRequest();
  const navigate = useNavigate();
  let isValidate = true;
  // --------------------------------------------------------------------------------------
  const frontEndValidation = (data) => {
    console.log(data);
    if (data.password !== data.rpassword) {
      isValidate = false;
      alert("password do not match");
    }
    return isValidate;
  };
  // --------------------------------------------------------------------------------------
  const makePostBody = (data) => {
    return {
      userName: data.userName,
      email: data.email,
      password: data.password,
      gender: data.gender,
      sendMail: data.sendMail,
      sendText: data.sendText,
    };
  };
  // --------------------------------------------------------------------------------------
  const onFormSubmit = (data) => {
    frontEndValidation(data);
    if (isValidate) {
      let postBody = makePostBody(data);
      request("POST", `/user/signup`, postBody);
    }
  };
  // --------------------------------------------------------------------------------------
  useEffect(() => {
    if (response) {
      console.log(response);
      localStorage.setItem("userToken", JSON.stringify(response));
      alert("user added");
      navigate("/user");
    }
  }, [response]);
  // --------------------------------------------------------------------------------------
  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div>
          <input
            type="text"
            placeholder="user name"
            {...register("userName")}
          />
          <br />
          <input type="email" placeholder="email" {...register("email")} />
          <br />
          <input
            type="password"
            placeholder="password"
            {...register("password")}
          />
          <br />
          <input
            type="password"
            placeholder="Repeat password"
            {...register("rpassword")}
          />
          <hr />
        </div>
        <div>
          male :{" "}
          <input type="radio" checked {...register("gender")} value="male" />
          female : <input type="radio" {...register("gender")} value="female" />
          other : <input type="radio" {...register("gender")} value="other" />
          <hr />
        </div>
        <div>
          Send mails : <input type="checkbox" {...register("sendMail")} />
          Send text : <input type="checkbox" {...register("sendText")} />
          <hr />
        </div>
        <div>
          {/* <input type="reset" value="reset" /> */}
          <input type="submit" value="submit form" />
        </div>
      </form>
    </div>
  );
};

export default AddUserUseForm;
