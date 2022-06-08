import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import { RenderInputFields, Input, Select, Button } from "../../../form/form";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { request: getDetails, response: getDetailsResponse } = useRequest();
  const { request: patchDetails, response: patchDetailsResponse } =
    useRequest();
  const isValidate = true;

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    gender: "male",
  });

  useEffect(() => {
    getDetails("GET", `/user/getOne/${id}`);
  }, []);

  useEffect(() => {
    if (getDetailsResponse) {
      // console.log(getDetailsResponse);
      setFormData(getDetailsResponse);
    }
  }, [getDetailsResponse]);

  // --------------------------------------------------------------------------------------
  const frontEndValidation = () => {
    return;
  };
  // --------------------------------------------------------------------------------------
  const makePatchBody = () => {
    return {
      userName: formData.userName,
      email: formData.email,
      gender: formData.gender,
    };
  };
  // --------------------------------------------------------------------------------------
  const submitHandler = (e) => {
    e.preventDefault();
    frontEndValidation();
    if (isValidate) {
      let patchBody = makePatchBody();
      patchDetails("PATCH", `/user/patchOne/${id}`, patchBody);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    if (patchDetailsResponse) {
      alert("user updated successful");
      setFormData({
        userName: "",
        email: "",
        gender: "male",
      });
      navigate("/user");
    }
  }, [patchDetailsResponse]);
  let inputFields = [
    {
      component: Input,
      type: "text",
      name: "userName",
      placeholder: "User Name",
      onchange: handleChange,
      value: formData.userName,
    },
    {
      component: Input,
      type: "email",
      name: "email",
      placeholder: "Email",
      onchange: handleChange,
      value: formData.email,
    },
    {
      component: Select,
      name: "gender",
      onchange: handleChange,
      value: formData.gender,
      options: [
        {
          text: "Male",
          opValue: "male",
        },
        {
          text: "Female",
          opValue: "female",
        },
      ],
    },
    {
      component: Button,
      type: "submit",
      value: "Update",
    },
  ];

  return (
    <div>
      {formData && (
        <form onSubmit={submitHandler}>
          <RenderInputFields inputFields={inputFields} />
        </form>
      )}
    </div>
  );
};

export default EditUser;
